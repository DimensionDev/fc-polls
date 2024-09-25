import { IMAGE_ZOOM_SCALE } from '@/constants';
import { ImageQuery } from '@/constants/zod';
import { getPollFrameButtons } from '@/helpers/getPollFrameButtons';
import { getPollFrameImage } from '@/helpers/getPollFrameImage';
import { Poll } from '@/types/api';

export const createFrameSuccessResponse = (poll: Poll, queryData: ImageQuery) => {
    return {
        image: getPollFrameImage({ poll, queryData }),
        buttons: getPollFrameButtons({ poll, queryData }),
        imageOptions: {
            headers: {
                'Cache-Control': 'public, max-age=0',
            },
            aspectRatio: '1:1' as const,
            sizes: {
                '1.91:1': { width: 1085 * IMAGE_ZOOM_SCALE, height: 568 * IMAGE_ZOOM_SCALE },
                '1:1': { width: 528 * IMAGE_ZOOM_SCALE, height: 528 * IMAGE_ZOOM_SCALE },
            },
        },
    };
};
