import { farcasterHubContext } from 'frames.js/middleware';
import { imagesWorkerMiddleware } from 'frames.js/middleware/images-worker';
import { createFrames } from 'frames.js/next';

import { lensFrame } from '@/config/lensFrame';
import { HOST, HUB_URL } from '@/constants/env';

export const frames = createFrames({
    baseUrl: HOST,
    basePath: '/api/frames',
    middleware: [
        imagesWorkerMiddleware({
            imagesRoute: '/images',
        }),
        farcasterHubContext({
            hubHttpUrl: HUB_URL,
        }),
        lensFrame,
    ],
});
