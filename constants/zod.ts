import { z } from 'zod';

import { IMAGE_THEME } from '@/constants/theme';

export const IMAGE_QUERY_SCHEMA = z.object({
    id: z.string(),
    profileId: z.string().optional(),
    date: z.string().optional(),
    theme: z.enum([IMAGE_THEME.Dark, IMAGE_THEME.Light]).optional().default(IMAGE_THEME.Light),
});
export type ImageQuery = z.infer<typeof IMAGE_QUERY_SCHEMA>;
