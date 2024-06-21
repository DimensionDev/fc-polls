import { Button } from 'frames.js/next';
import urlcat from 'urlcat';

import { FIREFLY_WEB_ROOT, PER_USER_VOTE_LIMIT } from '@/constants';
import { POLL_CHOICE_TYPE } from '@/constants/enum';
import { ImageQuery } from '@/constants/zod';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';
import { getPollFramePostUrl } from '@/helpers/getPollFramePostUrl';
import { indexToLetter } from '@/helpers/indexToLetter';
import { Poll } from '@/types/api';

interface Parameters {
    poll: Poll;
    queryData: ImageQuery;
}

const getFireflyLink = (subPath?: string) => {
    if (subPath?.startsWith('/profile/')) {
        return urlcat(FIREFLY_WEB_ROOT, subPath);
    }
    return FIREFLY_WEB_ROOT;
};

export const getPollFrameButtons = ({ poll, queryData }: Parameters) => {
    const postTarget = getPollFramePostUrl(queryData);
    const t = createFrameTranslator(queryData.locale);
    const votedList = poll.choice_detail.filter((choice) => choice.is_select);
    const maxVoteCount = poll.type === POLL_CHOICE_TYPE.Multiple ? poll.multiple_count : PER_USER_VOTE_LIMIT;

    const getFireflyLinkButton = () => (
        <Button key="redirect" action="link" target={getFireflyLink(queryData.author)}>
            {t`Go to Firefly`}
        </Button>
    );
    const getCheckButton = (label: string) => (
        <Button
            key="vote"
            action="post"
            target={urlcat('/check', {
                ...queryData,
                date: `${Date.now()}`,
            })}
        >
            {label}
        </Button>
    );

    if (poll.is_end) {
        return [getFireflyLinkButton()];
    }

    if (!queryData.profileId) {
        return [getCheckButton(t`Vote Now`), getFireflyLinkButton()];
    }

    if (votedList.length >= maxVoteCount) {
        return [getCheckButton(t`Refresh`), getFireflyLinkButton()];
    }

    return poll.choice_detail.map((choice, index) => (
        <Button key={index} action="post" target={postTarget}>
            {`${indexToLetter(index)}. ${choice.name}`}
        </Button>
    ));
};
