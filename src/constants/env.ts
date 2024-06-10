import { z } from 'zod';

import { NODE_ENV, VERCEL_NEV } from '@/constants/enum';

const InternalEnvSchema = z.object({});

const ExternalEnvSchema = z.object({
    NEXT_PUBLIC_VERCEL_ENV: z.nativeEnum(VERCEL_NEV).default(VERCEL_NEV.Development),
    NEXT_PUBLIC_FIREFLY_API_URL: z.string().default('https://api.firefly.land'),
    NEXT_PUBLIC_HOST: z.string().optional().default(''),
    NEXT_PUBLIC_HUB_URL: z.string().optional().default(''),
    NEXT_PUBLIC_HUB_API_KEY: z.string().optional(),
});

export const env = {
    shared: {
        NODE_ENV: process.env.NODE_ENV as NODE_ENV,
    },
    internal: (typeof window === 'undefined' ? InternalEnvSchema.parse(process.env) : {}) as z.infer<
        typeof InternalEnvSchema
    >,
    external: ExternalEnvSchema.parse({
        NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
        NEXT_PUBLIC_FIREFLY_API_URL: process.env.NEXT_PUBLIC_FIREFLY_API_URL,
        NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
        NEXT_PUBLIC_HUB_URL: process.env.NEXT_PUBLIC_HUB_URL,
        NEXT_PUBLIC_HUB_API_KEY: process.env.NEXT_PUBLIC_HUB_API_KEY,
    }),
};
