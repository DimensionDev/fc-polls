import { z } from 'zod';

import { IMAGE_THEME } from '@/constants/theme';

import { DEFAULT_FRAME_PREFIX } from '.';

export const IMAGE_QUERY_SCHEMA = z.object({
    id: z.string(),
    userId: z.string().optional(),
    prefix: z.string().optional().default(DEFAULT_FRAME_PREFIX),
    theme: z.enum([IMAGE_THEME.Dark, IMAGE_THEME.Light]).optional().default(IMAGE_THEME.Light),
    date: z.string().optional(),
});
export type ImageQuery = z.infer<typeof IMAGE_QUERY_SCHEMA>;
