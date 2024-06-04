import { z } from 'zod';

import { LOCALE } from '@/constants/enum';
import { IMAGE_THEME } from '@/constants/theme';

export const IMAGE_QUERY_SCHEMA = z.object({
    id: z.string(),
    profileId: z.string().optional(),
    date: z.string().optional(),
    theme: z.nativeEnum(IMAGE_THEME).optional().default(IMAGE_THEME.Light),
    locale: z.nativeEnum(LOCALE).optional().default(LOCALE.EN),
});
export type ImageQuery = z.infer<typeof IMAGE_QUERY_SCHEMA>;
