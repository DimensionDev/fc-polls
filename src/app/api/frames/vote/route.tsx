import { FrameHandler, frames } from '@/config/frames';
import { PER_USER_VOTE_LIMIT } from '@/constants';
import { FRAME_SOURCE, POLL_CHOICE_TYPE } from '@/constants/enum';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { compose } from '@/helpers/compose';
import { createFrameSuccessResponse } from '@/helpers/createFrameSuccessResponse';
import { parseFrameCtxZod } from '@/helpers/parseFrameCtxZod';
import { parsePollWithZod } from '@/helpers/parsePollWithZod';
import { withFrameRequestErrorHandler } from '@/helpers/withFrameRequestErrorHandler';
import { getPoll } from '@/services/getPoll';
import { vote } from '@/services/vote';

export const POST = frames(
    compose<FrameHandler>(withFrameRequestErrorHandler(), async (ctx) => {
        const queryData = IMAGE_QUERY_SCHEMA.parse(ctx.searchParams);
        const { id: pollId, locale } = queryData;

        const {
            profileId: pId,
            buttonIndex,
            requesterFid,
            requesterCustodyAddress,
            source,
        } = parseFrameCtxZod({ ...ctx.message, source: ctx.clientProtocol?.id }, locale);
        const isFarcaster = source === FRAME_SOURCE.Farcaster;
        const profileId = isFarcaster ? `${requesterFid}` : pId;

        const poll = parsePollWithZod(await getPoll(pollId, source, profileId), locale, buttonIndex);

        const body = await ctx.request.json();

        const currentChoice = poll.choice_detail[buttonIndex - 1];
        const votedLen = poll.choice_detail.filter((choice) => choice.is_select).length;
        const maxVoteCount = poll.type === POLL_CHOICE_TYPE.Multiple ? poll.multiple_count : PER_USER_VOTE_LIMIT;

        if (!currentChoice.is_select && votedLen < maxVoteCount) {
            const voteResult = await vote(
                {
                    poll_id: pollId,
                    platform: source,
                    platform_id: `${isFarcaster ? requesterFid : profileId}`,
                    choices: [currentChoice.id],
                    lens_token: isFarcaster ? '' : body.untrustedData.identityToken,
                    farcaster_signature: isFarcaster ? body.trustedData.messageBytes : '',
                    wallet_address: requesterCustodyAddress,
                    original_message: body.untrustedData,
                    signature_message: body.trustedData.messageBytes,
                },
                locale,
            );

            if (voteResult?.is_success) {
                poll.choice_detail = voteResult.choice_detail;
                // TODO: the interface should return vote count directly
                poll.vote_count = poll.choice_detail.reduce((acc, choice) => acc + choice.count, 0);
            }
        }

        return createFrameSuccessResponse(poll, { ...queryData, profileId, source });
    }),
);
