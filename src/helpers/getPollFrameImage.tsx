import { PollCard } from '@/components/PollCard';
import { LOCALE } from '@/constants/enum';
import { IMAGE_THEME } from '@/constants/theme';
import { Poll } from '@/types';

interface Parameters {
    poll: Poll;
    theme: IMAGE_THEME;
    profileId?: string;
    newVotedIdx?: number
    // we dont use this now
    locale?: LOCALE;
}

export const getPollFrameImage = ({ poll, theme, profileId, newVotedIdx }: Parameters) => {
    return <PollCard poll={poll} theme={theme} profileId={profileId} newVotedIdx={newVotedIdx} />;
};
