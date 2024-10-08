import { FRAME_SOURCE, POLL_CHOICE_TYPE } from '@/constants/enum';

export interface Response<T> {
    code: number;
    data?: T;
    error?: string[];
}

export interface ChoiceDetail {
    id: number;
    name: string;
    count: number;
    is_select: boolean;
    percent: number;
}

export interface Poll {
    poll_id: string;
    title: string;
    created_time: number;
    end_time: number;
    is_end: boolean;
    vote_count: number;
    type: string;
    multiple_count: number;
    choice_detail: ChoiceDetail[];
}

export type GetPollResponse = Response<Poll>;

export interface VoteRequest {
    poll_id: string;
    platform: FRAME_SOURCE;
    platform_id: string;
    choices: number[];
    lens_token: string;
    farcaster_signature: string;
    wallet_address: string;
    original_message: string;
    signature_message: string;
}

export type VoteResponse = Response<{
    is_success: boolean;
    choice_detail: ChoiceDetail[];
}>;

export interface CreatePollRequest {
    title: string;
    choices: string[];
    type: POLL_CHOICE_TYPE;
    multiple_count?: string;
    sub_time: number;
    strategies: string;
}

export type CreatePollResponse = Response<{
    poll_id: string;
}>;
