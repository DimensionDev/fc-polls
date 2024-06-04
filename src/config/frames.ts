import { farcasterHubContext } from 'frames.js/middleware';
import { imagesWorkerMiddleware } from 'frames.js/middleware/images-worker';
import { createFrames } from 'frames.js/next';

import { lensFrame } from '@/config/lensFrame';
import { env } from '@/constants/env';

export const frames = createFrames({
    baseUrl: env.internal.HOST,
    basePath: '/api/frames',
    middleware: [
        imagesWorkerMiddleware({
            imagesRoute: '/images',
        }),
        farcasterHubContext({
            hubHttpUrl: env.internal.HUB_URL,
        }),
        lensFrame,
    ],
});
