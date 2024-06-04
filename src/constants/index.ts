import { VERCEL_NEV } from "@/constants/enum";
import { env } from "@/constants/env";

export const POLL_OPTIONS_MIN_COUNT = 2;
export const POLL_OPTIONS_MAX_COUNT = 4;

export const MIN_VALID_IN_DAYS = 1;
export const MAX_VALID_IN_DAYS = Number.MAX_SAFE_INTEGER;

export const MAX_CHARS_POLL_TITLE = 320;
export const MAX_CHARS_POLL_OPTION = 25;

export const POLL_EXPIRY = 60 * 60 * 24 * 180; // Expire polls after 3 months

export const PER_USER_VOTE_LIMIT = 1;

export const COMMON_APP_TITLE = 'Polls';

export const IS_PRODUCTION = env.external.NEXT_PUBLIC_VERCEL_ENV === VERCEL_NEV.Production;
export const IS_DEVELOPMENT = env.external.NEXT_PUBLIC_VERCEL_ENV === VERCEL_NEV.Development;
export const IS_PREVIEW = env.external.NEXT_PUBLIC_VERCEL_ENV === VERCEL_NEV.Preview;
