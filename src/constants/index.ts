import { VERCEL_NEV } from '@/constants/enum';
import { env } from '@/constants/env';

export const POLL_OPTIONS_MIN_COUNT = 2;
export const POLL_OPTIONS_MAX_COUNT = 4;

export const MIN_VALID_IN_DAYS = 1;

export const MAX_CHARS_POLL_TITLE = 320;
export const MAX_CHARS_POLL_OPTION = 25;

export const PER_USER_VOTE_LIMIT = 1;

export const COMMON_APP_TITLE = 'Polls';

export const IS_PRODUCTION = env.external.NEXT_PUBLIC_VERCEL_ENV === VERCEL_NEV.Production;
export const IS_DEVELOPMENT = env.external.NEXT_PUBLIC_VERCEL_ENV === VERCEL_NEV.Development;
export const IS_PREVIEW = env.external.NEXT_PUBLIC_VERCEL_ENV === VERCEL_NEV.Preview;

export const FIREFLY_ROOT_URL = env.external.NEXT_PUBLIC_FIREFLY_API_URL;

export const IMAGE_ZOOM_SCALE = 2;
