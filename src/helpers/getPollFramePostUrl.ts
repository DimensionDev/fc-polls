import urlcat from 'urlcat';

import { ImageQuery } from '@/constants/zod';

export const getPollFramePostUrl = (options: ImageQuery) => {
    return urlcat('/vote', {
        ...options,
        date: `${Date.now()}`,
    });
};
