import { createImagesWorker } from 'frames.js/middleware/images-worker/next';

import { IMAGE_ZOOM_SCALE } from '@/constants';

const imagesWorker = createImagesWorker({
    imageOptions: {
        sizes: {
            '1.91:1': { width: 1085 * IMAGE_ZOOM_SCALE, height: 568 * IMAGE_ZOOM_SCALE },
            '1:1': { width: 528 * IMAGE_ZOOM_SCALE, height: 528 * IMAGE_ZOOM_SCALE },
        },
    },
});

export const GET = imagesWorker();
