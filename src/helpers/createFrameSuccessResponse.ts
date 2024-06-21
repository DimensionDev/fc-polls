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
        },
    };
};
