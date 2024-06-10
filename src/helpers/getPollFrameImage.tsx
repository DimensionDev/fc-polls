import { PollCard } from '@/components/PollCard';
import { ImageQuery } from '@/constants/zod';
import { Poll } from '@/types/api';

interface Parameters {
    poll: Poll;
    queryData: ImageQuery;
}

export const getPollFrameImage = ({ poll, queryData: { theme, locale } }: Parameters) => {
    return <PollCard poll={poll} theme={theme} locale={locale} />;
};
