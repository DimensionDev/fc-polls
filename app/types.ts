export type Poll = {
    id: string;
    title: string;
    created_at: number;
    validInDays: number;
    [key: `option${number}`]: string;
    [key: `votes${number}`]: number;
};

export type PollTheme = {
    titleColor: string;
    optionBgColor: string;
    optionTextColor: string;
    optionSelectedBgColor: string;
    cardBgColor: string;
};

export const POLL_EXPIRY = 60 * 60 * 24 * 180; // Expire polls after 3 months
