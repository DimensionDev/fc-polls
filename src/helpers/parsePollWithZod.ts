import { z } from 'zod';

import { PER_USER_VOTE_LIMIT } from '@/constants';
import { LOCALE, POLL_CHOICE_TYPE } from '@/constants/enum';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';
import { Poll } from '@/types/api';

export const parsePollWithZod = (poll: Poll | null, locale: LOCALE, currentVoteIndex: number) => {
    const t = createFrameTranslator(locale);
    const schema = z
        .object(
            {
                poll_id: z.string(),
                created_time: z.number().int().positive(),
                end_time: z.number().int().positive(),
                is_end: z.boolean(),
                vote_count: z.number().int().min(0),
                type: z.nativeEnum(POLL_CHOICE_TYPE),
                multiple_count: z.number().int().min(0).optional().default(PER_USER_VOTE_LIMIT),
                choice_detail: z.array(
                    z.object({
                        id: z.number().int().positive(),
                        name: z.string(),
                        count: z.number().int().min(0),
                        is_select: z.boolean(),
                        percent: z.number().int().min(0).max(100),
                    }),
                ),
            },
            {
                required_error: t`No poll found`,
            },
        )
        .transform((v, ctx) => {
            if (v.is_end) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t`Poll is expired`,
                });
                return z.NEVER;
            }
            const votedLen = v.choice_detail.filter((choice) => choice.is_select).length;
            const maxVoteCount = v.type === POLL_CHOICE_TYPE.Multiple ? v.multiple_count : PER_USER_VOTE_LIMIT;
            if (votedLen >= maxVoteCount) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t`You have voted ${votedLen} time${votedLen > 1 ? 's' : ''}, cannot vote again`,
                });
                return z.NEVER;
            }
            const currentChoice = v.choice_detail[currentVoteIndex - 1];
            if (!currentChoice) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t`Invalid vote choice`,
                });
                return z.NEVER;
            }
            if (currentChoice.is_select) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t`You have already voted for this choice`,
                });
                return z.NEVER;
            }
            return v;
        });

    return schema.parse(poll);
};
