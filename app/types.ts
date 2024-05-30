import { POLL_STATUS } from "@/constants";

export interface PollOption {
    id: string;
    text: string;
    votes: number;
    voted?: boolean;
};

export type Poll = {
    id: string;
    title: string;
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

// we can change this to a union type if needed
export type FramePrefix = string;

export interface FrameMetaOptions {
    image: string;
    postUrl: string;
    buttons: Array<{
        text: string;
        action?: string;
    }>;
    og: {
        title: string;
        images?: string[];
    };
    prefix?: FramePrefix;
};

export interface FrameMetaData {
    openGraph: {
        title: string;
        images: string[];
    };
    frameMetaList: Array<{ name: string, content: string }>;
};

export const POLL_EXPIRY = 60 * 60 * 24 * 180; // Expire polls after 3 months
