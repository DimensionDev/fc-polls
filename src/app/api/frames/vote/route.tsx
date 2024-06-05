import { error } from 'frames.js/core';
import { StatusCodes } from 'http-status-codes';

import { frames } from '@/config/frames';
import { PER_USER_VOTE_LIMIT, POLL_OPTIONS_MAX_COUNT } from '@/constants';
import { FRAME_SOURCE, POLL_STATUS } from '@/constants/enum';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { getPollFrameButtons } from '@/helpers/getPollFrameButtons';
import { getPollFrameImage } from '@/helpers/getPollFrameImage';
import { isCreatedByProfileId } from '@/helpers/isCreatedByProfileId';
import { resolveFrameSource } from '@/helpers/resolveFrameSource';
import { getPoll } from '@/services/getPoll';
import { vote } from '@/services/vote';

export const POST = frames(async (ctx) => {
    if (!ctx.message?.isValid) {
        error(`Got invalid message: message=${ctx.message}`, StatusCodes.BAD_REQUEST);
    }

    const source = ctx.clientProtocol?.id ? resolveFrameSource(ctx.clientProtocol.id) : null;
    if (!source) {
        error(`Not supported frame client protocol: ${ctx.clientProtocol?.id}`, StatusCodes.BAD_REQUEST);
    }

    const isFarcaster = source === FRAME_SOURCE.Farcaster;

    const { profileId: pId, buttonIndex, castId, pubId, requesterFid } = ctx.message;
    const profileId = isFarcaster ? `${requesterFid}` : pId;
    const postId = isFarcaster ? castId?.hash : pubId;

    if (!profileId || buttonIndex < 1 || buttonIndex > POLL_OPTIONS_MAX_COUNT) {
        error(`Got invalid parameters: profileId=${profileId}, buttonIndex=${buttonIndex}`, StatusCodes.BAD_REQUEST);
    }

    const queryData = IMAGE_QUERY_SCHEMA.parse(ctx.searchParams);
    const { id: pollId, theme } = queryData;
    if (!pollId) {
        error(`Missing PollId in frame state`, StatusCodes.BAD_REQUEST);
    }

    const poll = await getPoll(pollId, source, profileId);
    if (!poll) {
        error(`No valid poll found via pollId = ${pollId}`, StatusCodes.BAD_REQUEST);
    }

    if (poll.status !== POLL_STATUS.Active) {
        error(`The poll is unavailable via pollId = ${pollId}`);
    }

    const votedLen = poll.options.filter((opt) => opt.voted).length;
    if (votedLen >= PER_USER_VOTE_LIMIT) {
        error(`You have voted ${votedLen} times, cannot vote again`);
    }

    let voteSuccess = false;
    if (!poll.options[buttonIndex - 1]?.voted && !isCreatedByProfileId(poll, profileId)) {
        voteSuccess = await vote(pollId, buttonIndex, profileId, source);
    }

    const newVotedIdx = voteSuccess ? buttonIndex : undefined;

    return {
        image: getPollFrameImage({ poll, theme, profileId, newVotedIdx, locale: queryData.locale }),
        buttons: getPollFrameButtons({ poll, profileId, newVotedIdx, queryData }),
    };
});
