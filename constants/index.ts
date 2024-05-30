export const POLL_OPTIONS_MIN_COUNT = 2;
export const POLL_OPTIONS_MAX_COUNT = 4;

export const MIN_VALID_IN_DAYS = 1;
export const MAX_VALID_IN_DAYS = Number.MAX_SAFE_INTEGER;

export const MAX_CHARS_POLL_TITLE = 320;
export const MAX_CHARS_POLL_OPTION = 25;

export const POLL_EXPIRY = 60 * 60 * 24 * 180; // Expire polls after 3 months

export const DEFAULT_FRAME_PREFIX = 'fc';

export const DEFAULT_FRAME_VERSION = 'vNext';

export const PER_USER_VOTE_LIMIT = 1;

export enum POLL_STATUS {
    ACTIVE = 'active',
    CLOSED = 'closed',
}
