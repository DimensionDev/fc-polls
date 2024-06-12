import { createImagesWorker } from 'frames.js/middleware/images-worker/next';

const imagesWorker = createImagesWorker({
    imageOptions: {
        sizes: {
            '1.91:1': { width: 600, height: 400 },
            '1:1': { width: 600, height: 400 },
        },
    },
});

export const GET = imagesWorker();
