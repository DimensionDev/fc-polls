import { FrameHandler, frames } from '@/config/frames';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { compose } from '@/helpers/compose';
import { createFrameSuccessResponse } from '@/helpers/createFrameSuccessResponse';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';
import { withFrameRequestErrorHandler } from '@/helpers/withFrameRequestErrorHandler';
import { getPoll } from '@/services/getPoll';

const handleRequest = frames(
    compose<FrameHandler>(withFrameRequestErrorHandler(), async (ctx) => {
        const queryData = IMAGE_QUERY_SCHEMA.parse(ctx.searchParams);
        const { id, profileId, source, locale } = queryData;
        const t = createFrameTranslator(locale);
        const poll = await getPoll(id, source, profileId);

        if (!poll) {
            throw new Error(t`No poll found via pollId="${id}"`, {
                cause: t`Try again`,
            });
        }

        return createFrameSuccessResponse(poll, queryData);
    }),
);

export const GET = handleRequest;
export const POST = handleRequest;
