import { z } from 'zod';

import { FRAME_SOURCE, LOCALE, POLL_CHOICE_TYPE } from '@/constants/enum';
import { IMAGE_THEME } from '@/constants/theme';

import { PER_USER_VOTE_LIMIT } from '.';

export const IMAGE_QUERY_SCHEMA = z.object({
    id: z.string(),
    profileId: z.string().optional(),
    date: z.string().optional(),
    theme: z.nativeEnum(IMAGE_THEME).optional().default(IMAGE_THEME.Light).catch(IMAGE_THEME.Light),
    locale: z.nativeEnum(LOCALE).optional().default(LOCALE.EN).catch(LOCALE.EN),
    source: z.nativeEnum(FRAME_SOURCE).default(FRAME_SOURCE.Farcaster),
});
export type ImageQuery = z.infer<typeof IMAGE_QUERY_SCHEMA>;

export const VALID_POLL_SCHEMA = z
    .object({
        poll_id: z.string(),
        title: z.string(),
        created_time: z.number().int().positive(),
        end_time: z.number().int().positive(),
        is_end: z.boolean(),
        vote_count: z.number().int().positive(),
        type: z.nativeEnum(POLL_CHOICE_TYPE),
        multiple_count: z.number().int().positive(),
        choice_detail: z.array(
            z.object({
                id: z.number().int().positive(),
                name: z.string(),
                count: z.number().int().positive(),
                is_select: z.boolean(),
                percent: z.number().int().positive(),
            }),
        ),
    })
    .transform((v, ctx) => {
        if (v.is_end) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Poll is expired',
            });
            return z.NEVER;
        }
        const votedLen = v.choice_detail.filter((choice) => choice.is_select).length;
        const maxVoteCount = v.type === POLL_CHOICE_TYPE.Multiple ? v.multiple_count : PER_USER_VOTE_LIMIT;
        if (votedLen >= maxVoteCount) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `You have voted ${votedLen} time${votedLen > 1 ? 's' : ''}, cannot vote again`,
            });
            return z.NEVER;
        }
        return v;
    });
