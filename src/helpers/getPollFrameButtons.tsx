import { Button } from 'frames.js/next';

import { PER_USER_VOTE_LIMIT } from '@/constants';
import { POLL_CHOICE_TYPE } from '@/constants/enum';
import { ImageQuery } from '@/constants/zod';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';
import { getPollFramePostUrl } from '@/helpers/getPollFramePostUrl';
import { Poll } from '@/types/api';

interface Parameters {
    poll: Poll;
    queryData: ImageQuery;
}

export const getPollFrameButtons = ({ poll, queryData }: Parameters) => {
    const postTarget = getPollFramePostUrl(queryData);
    const t = createFrameTranslator(queryData.locale);
    const votedList = poll.choice_detail.filter((choice) => choice.is_select);
    const maxVoteCount = poll.type === POLL_CHOICE_TYPE.Multiple ? poll.multiple_count : PER_USER_VOTE_LIMIT;

    if (poll.is_end || votedList.length >= maxVoteCount) {
        return [];
    }

    return poll.choice_detail.map((choice, index) => (
        <Button key={index} action="post" target={postTarget}>
            {choice.name}
        </Button>
    ));
};
