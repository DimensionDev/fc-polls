import { FRAME_SOURCE, POLL_STATUS } from '@/constants/enum';

export interface PollOption {
    id: string;
    text: string;
    votes: number;
    voted?: boolean;
}

export type Poll = {
    id: string;
    title: string;
    /** author */
    created_by: string;
    source: FRAME_SOURCE;
    created_at: number;
    status: POLL_STATUS;
    totalVotes: number;
    validInDays: number;
    options: PollOption[];
};

export type PollTheme = {
    titleColor: string;
    optionBgColor: string;
    optionTextColor: string;
    optionSelectedBgColor: string;
    cardBgColor: string;
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
