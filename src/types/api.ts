export interface Response<T> {
    code: number;
    data?: T;
    error?: string[];
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
    choice_detail: Array<{
        id: number;
        name: string;
        count: number;
        is_select: boolean;
        percent: number;
    }>;
}

export type GetPollResponse = Response<Poll>;
