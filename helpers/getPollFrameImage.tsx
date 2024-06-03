import { Poll } from '@/app/types';
import { ErrorHolder } from '@/components/ErrorHolder';
import { PollCard } from '@/components/PollCard';
import { IMAGE_THEME } from '@/constants/theme';

interface Parameters {
    poll: Poll | null;
    theme: IMAGE_THEME;
    profileId?: string;
    newVotedIdx?: number
}

export const getPollFrameImage = ({ poll, theme, profileId, newVotedIdx }: Parameters) => {
    if (!poll) {
        return <ErrorHolder text='Missing poll' />;
    }
    return <PollCard poll={poll} theme={theme} profileId={profileId} newVotedIdx={newVotedIdx} />;
};
