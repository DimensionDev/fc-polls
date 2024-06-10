import { farcasterHubContext } from 'frames.js/middleware';
import { imagesWorkerMiddleware } from 'frames.js/middleware/images-worker';
import { createFrames } from 'frames.js/next';

import { lensFrame } from '@/config/lensFrame';
import { env } from '@/constants/env';

const hubRequestHeaders: Record<string, string> = {};
if (env.external.NEXT_PUBLIC_HUB_API_KEY) {
    hubRequestHeaders.api_key = env.external.NEXT_PUBLIC_HUB_API_KEY;
}

export const frames = createFrames({
    baseUrl: env.external.NEXT_PUBLIC_HOST,
    basePath: '/api/frames',
    middleware: [
        imagesWorkerMiddleware({
            imagesRoute: '/images',
        }),
        farcasterHubContext({
            hubHttpUrl: env.external.NEXT_PUBLIC_HUB_URL,
            hubRequestOptions: {
                headers: hubRequestHeaders,
            },
        }),
        lensFrame,
    ],
});
