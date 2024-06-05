import { Button } from 'frames.js/next';

import { PER_USER_VOTE_LIMIT } from '@/constants';
import { POLL_STATUS } from '@/constants/enum';
import { ImageQuery } from '@/constants/zod';
import { getPollFramePostUrl } from '@/helpers/getPollFramePostUrl';
import { isCreatedByProfileId } from '@/helpers/isCreatedByProfileId';
import { Poll } from '@/types';

interface Parameters {
    poll: Poll;
    queryData: ImageQuery;
    profileId?: string;
    newVotedIdx?: number;
}

export const getPollFrameButtons = ({ poll, newVotedIdx, profileId, queryData }: Parameters) => {
    const postTarget = getPollFramePostUrl(queryData);
    const votedIdxList =
        poll.options.reduce(
            (acc, opt, index) => {
                return opt.voted ? [...acc, index + 1] : acc;
            },
            newVotedIdx ? [newVotedIdx] : [],
        ) ?? [];
    if (
        poll.status !== POLL_STATUS.Active ||
        isCreatedByProfileId(poll, profileId) ||
        votedIdxList.length >= PER_USER_VOTE_LIMIT
    ) {
        return [];
    }

    return poll.options.map((opt, index) => (
        <Button key={index} action="post" target={postTarget}>
            {opt.text}
        </Button>
    ));
};
