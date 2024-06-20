import { FrameHandler, frames } from '@/config/frames';
import { FRAME_SOURCE } from '@/constants/enum';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { compose } from '@/helpers/compose';
import { createFrameSuccessResponse } from '@/helpers/createFrameSuccessResponse';
import { parseFrameCtxZod } from '@/helpers/parseFrameCtxZod';
import { parsePollWithZod } from '@/helpers/parsePollWithZod';
import { withFrameRequestErrorHandler } from '@/helpers/withFrameRequestErrorHandler';
import { getPoll } from '@/services/getPoll';

export const POST = frames(
    compose<FrameHandler>(withFrameRequestErrorHandler(), async (ctx) => {
        const queryData = IMAGE_QUERY_SCHEMA.parse(ctx.searchParams);
        const { id: pollId, locale } = queryData;

        const {
            profileId: pId,
            requesterFid,
            source,
        } = parseFrameCtxZod({ ...ctx.message, source: ctx.clientProtocol?.id }, locale);
        const isFarcaster = source === FRAME_SOURCE.Farcaster;
        const profileId = isFarcaster ? `${requesterFid}` : pId;

        const poll = parsePollWithZod(await getPoll(pollId, source, profileId), locale);

        return createFrameSuccessResponse(poll, { ...queryData, profileId, source });
    }),
);
