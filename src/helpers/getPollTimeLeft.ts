import { LOCALE } from '@/constants/enum';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';
import { Poll } from '@/types/api';

export const getPollTimeLeft = (poll: Poll, locale: LOCALE) => {
    const t = createFrameTranslator(locale);
    const { is_end, end_time } = poll;
    const now = new Date().getTime();
    const timeLeft = end_time * 1000 - now;

    if (is_end || timeLeft <= 0) {
        return t`Final results`;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    if (days >= 1) {
        return t`${days} day${days > 1 ? 'S' : ''} left`;
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    if (hours >= 1) {
        return t`${hours} hour${hours > 1 ? 'S' : ''} left`;
    }

    const minutes = Math.floor(timeLeft / (1000 * 60));
    if (minutes >= 1) {
        return t`${minutes} minute${minutes > 1 ? 'S' : ''} left`;
    }

    return t`Less than a minute left`;
};
