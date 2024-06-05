import { z } from 'zod';

import { VERCEL_NEV } from '@/constants/enum';

const InternalEnvSchema = z.object({});

const ExternalEnvSchema = z.object({
    NEXT_PUBLIC_VERCEL_ENV: z.nativeEnum(VERCEL_NEV).default(VERCEL_NEV.Development),
    HOST: z.string(),
    HUB_URL: z.string(),
    HUB_API_KEY: z.string().optional(),
});

export const env = {
    internal: (typeof window === 'undefined' ? InternalEnvSchema.parse(process.env) : {}) as z.infer<
        typeof InternalEnvSchema
    >,
    external: ExternalEnvSchema.parse({
        NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
        HOST: process.env.HOST,
        HUB_URL: process.env.HUB_URL,
        HUB_API_KEY: process.env.HUB_API_KEY,
    }),
};
