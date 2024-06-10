import { frames } from '@/config/frames';
import { FRAME_SOURCE } from '@/constants/enum';
import { IMAGE_QUERY_SCHEMA, ImageQuery } from '@/constants/zod';
import { createFrameErrorResponse } from '@/helpers/createFrameErrorResponse';
import { createFrameSuccessResponse } from '@/helpers/createFrameSuccessResponse';
import { parseFrameCtx } from '@/helpers/parseFrameCtx';
import { parsePollWithZod } from '@/helpers/parsePollWithZod';
import { getPoll } from '@/services/getPoll';
import { vote } from '@/services/vote';

export const POST = frames(async (ctx) => {
    let queryData: ImageQuery | null = null;
    try {
        queryData = IMAGE_QUERY_SCHEMA.parse(ctx.searchParams);
        const { id: pollId, locale, source } = queryData;

        const {
            profileId: pId,
            buttonIndex,
            requesterFid,
            requesterCustodyAddress,
        } = parseFrameCtx(ctx.message, locale);
        const isFarcaster = source === FRAME_SOURCE.Farcaster;
        const profileId = isFarcaster ? `${requesterFid}` : pId;

        const poll = parsePollWithZod(await getPoll(pollId, source, profileId), locale, buttonIndex);

        const body = await ctx.request.json();

        const voteResult = await vote(
            {
                poll_id: pollId,
                platform: source,
                platform_id: `${isFarcaster ? requesterFid : profileId}`,
                choices: [poll.choice_detail[buttonIndex - 1].id],
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
        }

        return createFrameSuccessResponse(poll, queryData);
    } catch (error) {
        return createFrameErrorResponse({
            text: error instanceof Error ? error.message : `${error}`,
            queryData: queryData ? { ...queryData, date: `${Date.now()}` } : null,
        });
    }
});
