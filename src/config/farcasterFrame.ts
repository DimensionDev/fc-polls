import {
    ClientProtocolId,
    FrameActionDataParsedAndHubContext,
    FrameActionPayload,
    FrameMessageReturnType,
    getAddressesForFid,
    getFrameMessage,
    HubHttpUrlOptions,
} from 'frames.js';
import { FramesMiddleware, JsonValue } from 'frames.js/core/types';
import { MessageWithWalletAddressImplementation } from 'frames.js/middleware/walletAddressMiddleware';

import { InvalidFrameActionPayloadError, RequestBodyNotJSONError } from '@/constants/error';

type FrameMessage = Omit<FrameMessageReturnType<{ fetchHubContext: true }>, 'message'> & {
    state?: JsonValue;
} & MessageWithWalletAddressImplementation;
type FramesMessageContext = {
    message?: FrameMessage;
    clientProtocol?: ClientProtocolId;
};

function isValidFrameActionPayload(value: unknown): value is FrameActionPayload {
    return typeof value === 'object' && value !== null && 'trustedData' in value && 'untrustedData' in value;
}

async function decodeFrameActionPayloadFromRequest(request: Request): Promise<FrameActionPayload | undefined> {
    try {
        // use clone just in case someone wants to read body somewhere along the way
        const body = (await request
            .clone()
            .json()
            .catch(() => {
                throw new RequestBodyNotJSONError();
            })) as JSON;

        if (!isValidFrameActionPayload(body)) {
            throw new InvalidFrameActionPayloadError();
        }

        return body;
    } catch (e) {
        if (e instanceof RequestBodyNotJSONError || e instanceof InvalidFrameActionPayloadError) {
            return undefined;
        }

        // eslint-disable-next-line no-console -- provide feedback to the developer
        console.error(e);

        return undefined;
    }
}

export function farcasterHubContext(options: HubHttpUrlOptions): FramesMiddleware<any, FramesMessageContext> {
    return async (context, next) => {
        if (context.request.method !== 'POST') {
            return next();
        }

        const payload = await decodeFrameActionPayloadFromRequest(context.request);
        if (!payload) {
            return next();
        }

        try {
            const message = (await getFrameMessage(payload, {
                ...options,
                fetchHubContext: false,
            })) as FrameActionDataParsedAndHubContext;

            const requesterEthAddresses = await getAddressesForFid({
                fid: message.requesterFid,
                options: {
                    hubHttpUrl: options.hubHttpUrl,
                    hubRequestOptions: options.hubRequestOptions,
                },
            });
            console.log('farcasterHubContext middleware: requesterEthAddresses', requesterEthAddresses);
            const requesterCustodyAddress = requesterEthAddresses.find((item) => item.type === 'custody')?.address;
            if (!requesterCustodyAddress) {
                throw new Error('Custody address not found');
            }

            const requesterVerifiedAddresses = requesterEthAddresses
                .filter((item) => item.type === 'verified')
                .map((item) => item.address);

            message.requesterVerifiedAddresses = requesterVerifiedAddresses;
            message.requesterCustodyAddress = requesterCustodyAddress;

            const [address] = message.requesterVerifiedAddresses;

            return next({
                message: {
                    ...message,
                    walletAddress() {
                        return Promise.resolve(address ?? message.requesterCustodyAddress);
                    },
                },
                clientProtocol: {
                    id: 'farcaster',
                    version: 'vNext', // TODO: Pass version in getFrameMessage
                },
            });
        } catch (error) {
            console.log('farcasterHubContext middleware: error while decoding farcaster message', error);
            // eslint-disable-next-line no-console -- provide feedback to the developer
            console.info(
                'farcasterHubContext middleware: could not decode farcaster message from payload, calling next.',
            );
            return next();
        }
    };
}
