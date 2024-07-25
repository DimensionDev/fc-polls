import { POLL_CHOICE_TYPE } from '@/constants/enum';

type JsonObject = {
    [Key in string]: JsonValue;
} & {
    [Key in string]?: JsonValue | undefined;
};
type JsonArray = JsonValue[] | readonly JsonValue[];
type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

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
    percentColor: string;
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

export interface NextRequestContext {
    params: Record<string, string | undefined>;
}

export interface FrameContext {
    basePath: string;
    initialState?: JsonValue;
    request: Request;
    url: URL;
    baseUrl: URL;
    stateSigningSecret?: string;
    pressedButton?: {
        action: string;
        index: number;
    };
    searchParams: Record<string, string>;
    message?: {
        specVersion?: string;
        url?: string;
        buttonIndex: number;
        profileId?: string;
        pubId?: string;
        inputText?: string;
        state?: string & JsonValue;
        actionResponse?: string;
        deadline?: number;
        isValid: boolean;
    };
    clientProtocol?: { id: string; version: string };
    state?: JsonValue;
}
