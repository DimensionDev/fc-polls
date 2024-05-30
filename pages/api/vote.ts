import { getSSLHubRpcClient, Message } from '@farcaster/hub-nodejs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PER_USER_VOTE_LIMIT, POLL_OPTIONS_MAX_COUNT, POLL_STATUS } from '@/constants';
import { HOST, HUB_URL } from '@/constants/env';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { createErrorResponseJSONForLegacy } from '@/helpers/createErrorResponseJSONForLegacy';
import { createFrameMetaLabelFromPoll } from '@/helpers/createFrameMetaLabelFromPoll';
import { getPoll } from '@/services/getPoll';
import { vote } from '@/services/vote';

const client = HUB_URL ? getSSLHubRpcClient(HUB_URL) : undefined;

// FIXME: We should use app router to handle this, but getSSLHubRpcClient is not compatible with app router
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const queryData = IMAGE_QUERY_SCHEMA.parse(req.query);

            if (!queryData.id) {
                return createErrorResponseJSONForLegacy(res, 'Missing poll ID');
            }

            const poll = await getPoll(queryData.id);
            if (!poll) {
                return createErrorResponseJSONForLegacy(res, 'Missing poll');
            }

            let validatedMessage: Message | undefined = undefined;
            const body = req.body;

            try {
                const frameMessage = Message.decode(Buffer.from(body?.trustedData?.messageBytes || '', 'hex'));
                const result = await client?.validateMessage(frameMessage);
                if (result?.isOk() && result.value.valid) {
                    validatedMessage = result.value.message;
                }

                // Also validate the frame url matches the expected url
                const urlBuffer = validatedMessage?.data?.frameActionBody?.url || [];
                const urlString = Buffer.from(urlBuffer).toString('utf-8');
                if (validatedMessage && !urlString.startsWith(HOST || '')) {
                    return createErrorResponseJSONForLegacy(res, `Invalid frame url: ${urlBuffer}`);
                }
            } catch (e) {
                return createErrorResponseJSONForLegacy(res, `Failed to validate message: ${e}`);
            }

            let buttonId = 0,
                fid = 0;
            if (client && validatedMessage) {
                buttonId = validatedMessage?.data?.frameActionBody?.buttonIndex || 0;
                fid = validatedMessage?.data?.fid || 0;
            } else {
                // If HUB_URL is not provided, don't validate and fall back to untrusted data
                buttonId = body.untrustedData?.buttonIndex || 0;
                fid = body.untrustedData?.fid || 0;
            }

            const votedList = poll.options.reduce<number[]>(
                (acc, opt, index) => (opt.voted ? [...acc, index + 1] : acc),
                [],
            );

            let voteSuccess = false;
            if (
                fid > 0 &&
                buttonId > 0 &&
                buttonId <= POLL_OPTIONS_MAX_COUNT &&
                poll.status === POLL_STATUS.ACTIVE &&
                votedList.length < PER_USER_VOTE_LIMIT
            ) {
                voteSuccess = await vote(queryData.id, buttonId, fid);
            }

            const frameMetas = createFrameMetaLabelFromPoll(
                poll,
                queryData,
                poll.status !== POLL_STATUS.ACTIVE || votedList.length + Number(voteSuccess) >= PER_USER_VOTE_LIMIT,
            );

            // Return an HTML response
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(
                `<!DOCTYPE html>
                    <html>
                        <head>
                        <title>Vote Recorded</title>
                        ${frameMetas}
                        </head>
                        <body>
                        <p>${votedList.length ? `You have already voted. You clicked ${votedList.join(', ')}` : `Your vote for ${buttonId} has been recorded for fid ${fid}.`}</p>
                        </body>
                    </html>`,
            );
        } catch (error) {
            if (error instanceof Error) {
                return createErrorResponseJSONForLegacy(res, error.message);
            } else {
                return createErrorResponseJSONForLegacy(res, 'unknown error');
            }
        }
    } else {
        createErrorResponseJSONForLegacy(res, 'Method Not Allowed', { status: 405 });
    }
}
