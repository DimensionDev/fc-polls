import { z } from 'zod';

import { FRAME_SOURCE, LOCALE } from '@/constants/enum';
import { IMAGE_THEME } from '@/constants/theme';

export const IMAGE_QUERY_SCHEMA = z.object({
    id: z.string(),
    profileId: z.string().optional(),
    date: z.string().optional(),
    theme: z.nativeEnum(IMAGE_THEME).optional().default(IMAGE_THEME.Light).catch(IMAGE_THEME.Light),
    locale: z.nativeEnum(LOCALE).optional().default(LOCALE.en).catch(LOCALE.en),
    source: z.nativeEnum(FRAME_SOURCE).default(FRAME_SOURCE.Farcaster),
    author: z.string().optional(),
    handle: z.string().optional(),
});
export type ImageQuery = z.infer<typeof IMAGE_QUERY_SCHEMA>;
