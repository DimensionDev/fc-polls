import { error } from 'frames.js/core';

import { frames } from '@/config/frames';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { getPollFrameButtons } from '@/helpers/getPollFrameButtons';
import { getPollFrameImage } from '@/helpers/getPollFrameImage';
import { getPoll } from '@/services/getPoll';
import { Poll } from '@/types';

const handleRequest = frames(async (ctx) => {
    const queryData = IMAGE_QUERY_SCHEMA.parse(ctx.searchParams);
    const { id, profileId, theme, source } = queryData;
    let poll: Poll | null = null;

    if (id && source) {
        poll = await getPoll(id, source, profileId);
    }

    if (!poll) {
        error(`Missing poll via pollId=${id} and clientProtocol=${source}`);
    }

    return {
        image: getPollFrameImage({ poll, theme, profileId, locale: queryData.locale }),
        buttons: getPollFrameButtons({ poll, profileId, queryData }),
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
