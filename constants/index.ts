export const POLL_OPTIONS_MIN_COUNT = 2;
export const POLL_OPTIONS_MAX_COUNT = 4;

export const MIN_VALID_IN_DAYS = 1;
export const MAX_VALID_IN_DAYS = Number.MAX_SAFE_INTEGER;

export const MAX_CHARS_POLL_TITLE = 320;
export const MAX_CHARS_POLL_OPTION = 25;

export const POLL_EXPIRY = 60 * 60 * 24 * 180; // Expire polls after 3 months

export const DEFAULT_FRAME_PREFIX = 'fc';

export const NULL_POLL = {
    id: '',
    title: 'No poll found',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    votes1: 0,
    votes2: 0,
    votes3: 0,
    votes4: 0,
    created_at: 0,
    validInDays: MIN_VALID_IN_DAYS,
};
