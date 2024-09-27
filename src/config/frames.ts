import { farcasterHubContext } from 'frames.js/middleware';
import { imagesWorkerMiddleware } from 'frames.js/middleware/images-worker';
import { createFrames } from 'frames.js/next';

import { lensFrame } from '@/config/lensFrame';
import { IMAGE_ZOOM_SCALE } from '@/constants';
import { env } from '@/constants/env';
import { loadFonts } from '@/helpers/loadFonts';
import { FrameContext } from '@/types';

const hubRequestHeaders: Record<string, string> = {};
if (env.external.NEXT_PUBLIC_HUB_API_KEY) {
    hubRequestHeaders.api_key = env.external.NEXT_PUBLIC_HUB_API_KEY;
}

export const frames = createFrames({
    baseUrl: env.external.NEXT_PUBLIC_HOST,
    basePath: '/api/frames',
    middleware: [
        imagesWorkerMiddleware({}),
        farcasterHubContext({
            hubHttpUrl: env.external.NEXT_PUBLIC_HUB_URL,
            hubRequestOptions: {
                headers: hubRequestHeaders,
            },
        }),
        lensFrame,
    ],
    imageRenderingOptions: async () => {
        const fonts = await loadFonts();

        return {
            imageOptions: {
                fonts,
                sizes: {
                    '1.91:1': { width: 1085 * IMAGE_ZOOM_SCALE, height: 568 * IMAGE_ZOOM_SCALE },
                    '1:1': { width: 600 * IMAGE_ZOOM_SCALE, height: 600 * IMAGE_ZOOM_SCALE },
                },
            },
        };
    },
});

export type FrameHandler = (ctx: FrameContext) => ReturnType<Parameters<typeof frames>[0]>;
