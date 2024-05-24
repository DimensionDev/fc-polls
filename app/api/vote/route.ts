import { getSSLHubRpcClient, Message } from '@farcaster/hub-nodejs';
import { NextRequest } from 'next/server';

import { DEFAULT_FRAME_PREFIX } from '@/constants';
import { createErrorResponseJSON } from '@/helpers/createErrorResponseJSON';
import { generateFrameMetas } from '@/helpers/generateFrameMetas';
import { mergeSearchParams } from '@/helpers/mergeSearchParams';
import { checkIfVoted } from '@/services/checkIfVoted';
import { getPoll } from '@/services/getPoll';
import { vote } from '@/services/vote';

const HUB_URL = process.env.HUB_URL;
const client = HUB_URL ? getSSLHubRpcClient(HUB_URL) : undefined;

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pollId = searchParams.get('id');
        const results = searchParams.get('results') === 'true';
        let voted = searchParams.get('voted') === 'true';

        if (!pollId) {
            return createErrorResponseJSON('Missing poll ID');
        }

        let validatedMessage: Message | undefined = undefined;
        const body = await request.json();

        try {
            const frameMessage = Message.decode(Buffer.from(body?.trustedData?.messageBytes || '', 'hex'));
            const result = await client?.validateMessage(frameMessage);
            if (result?.isOk() && result.value.valid) {
                validatedMessage = result.value.message;
            }

            // Also validate the frame url matches the expected url
            const urlBuffer = validatedMessage?.data?.frameActionBody?.url || [];
            const urlString = Buffer.from(urlBuffer).toString('utf-8');
            if (validatedMessage && !urlString.startsWith(process.env.HOST || '')) {
                return createErrorResponseJSON(`Invalid frame url: ${urlBuffer}`);
            }
        } catch (e) {
            return createErrorResponseJSON(`Failed to validate message: ${e}`);
        }

        let buttonId = 0,
            fid = 0;
        // If HUB_URL is not provided, don't validate and fall back to untrusted data
        if (client && validatedMessage) {
            buttonId = validatedMessage?.data?.frameActionBody?.buttonIndex || 0;
            fid = validatedMessage?.data?.fid || 0;
        } else {
            buttonId = body.untrustedData?.buttonIndex || 0;
            fid = body.untrustedData?.fid || 0;
        }

        const voteExists = await checkIfVoted(pollId, fid);
        voted = voted || !!voteExists;

        if (fid > 0 && buttonId > 0 && buttonId < 5 && !results && !voted) {
            await vote(pollId, buttonId, fid);
        }

        const poll = await getPoll(pollId);

        if (!poll) {
            return createErrorResponseJSON('Missing poll ID');
        }

        const imageParams = mergeSearchParams(
            searchParams,
            {
                date: Date.now().toString(),
                results: `${!results}`,
                fid: fid > 0 ? `${fid}` : '',
            },
            ['voted'],
        );
        const imageUrl = `${process.env.HOST}/api/image?${imageParams.toString()}`;

        let button1Text = 'View Results';
        if (!voted && !results) {
            button1Text = 'Back';
        } else if (voted && !results) {
            button1Text = 'Already Voted';
        } else if (voted && results) {
            button1Text = 'View Results';
        }

        const frameMetas = generateFrameMetas({
            title: poll.title,
            imageUrl,
            postUrl: `${process.env.HOST}/api/vote?voted=true&${imageParams.toString()}`,
            prefix: searchParams.get('prefix') || DEFAULT_FRAME_PREFIX,
            buttons: [
                {
                    text: button1Text,
                },
            ],
        });

        // Return an HTML response
        return new Response(
            `<!DOCTYPE html>
                <html>
                    <head>
                    <title>Vote Recorded</title>
                    ${frameMetas}
                    </head>
                    <body>
                    <p>${results || voted ? `You have already voted. You clicked ${buttonId}` : `Your vote for ${buttonId} has been recorded for fid ${fid}.`}</p>
                    </body>
                </html>`,
            {
                headers: {
                    'Content-Type': 'text/html',
                },
            },
        );
    } catch (error) {
        if (error instanceof Error) {
            return createErrorResponseJSON(error.message);
        } else {
            return createErrorResponseJSON('unknown error');
        }
    }
}
