
import { frames } from '@/config/frames';
import { IMAGE_QUERY_SCHEMA, ImageQuery } from '@/constants/zod';
import { createFrameErrorResponse } from '@/helpers/createFrameErrorResponse';
import { createFrameSuccessResponse } from '@/helpers/createFrameSuccessResponse';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';
import { getPoll } from '@/services/getPoll';

const handleRequest = frames(async (ctx) => {
    let queryData: ImageQuery | null = null;
    try {
        queryData = IMAGE_QUERY_SCHEMA.parse(ctx.searchParams);
        const { id, profileId, source, locale } = queryData;
        const t = createFrameTranslator(locale);
        const poll = await getPoll(id, source, profileId)

        if (!poll) {
            throw new Error(t`No poll found via pollId="${id}"`)
        }

        return createFrameSuccessResponse(poll, queryData);
    } catch (error) {
        return createFrameErrorResponse({
            text: error instanceof Error ? error.message : `${error}`,
            queryData
        });
    }
});

export const GET = handleRequest;
export const POST = handleRequest;
