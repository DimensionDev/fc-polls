import { POLL_CHOICE_TYPE } from '@/constants/enum';

export interface PollOption {
    id: string;
    text: string;
    votes: number;
    voted?: boolean;
}

export interface CompositePoll {
    id?: string;
    options: PollOption[];
    duration: {
        days: number;
        hours: number;
        minutes: number;
    };
    type: POLL_CHOICE_TYPE;
    multiple_count?: string;
    strategies: string;
}

export type PollTheme = {
    titleColor: string;
    optionBgColor: string;
    optionTextColor: string;
    optionSelectedTextColor: string;
    optionSelectedBgColor: string;
    cardBgColor: string;
    secondTextColor: string;
};

export interface FrameButton {
    index: number;
    text: string;
    action: string;
    target?: string;
}

export type FrameData = {
    image: string;
    buttons: FrameButton[];
};
