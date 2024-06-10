import { z } from "zod";

import { POLL_OPTIONS_MAX_COUNT } from "@/constants";
import { LOCALE } from "@/constants/enum";
import { createFrameTranslator } from "@/helpers/createFrameTranslator";

export const parseFrameCtx = (ctx: unknown, locale: LOCALE) => {
    const t = createFrameTranslator(locale);
    const schema = z.object({
        isValid: z.boolean().optional(),
        profileId: z.string().optional(),
        buttonIndex: z.number().int().positive(),
        requesterFid: z.number().int().positive().optional(),
        requesterCustodyAddress: z.string().optional().default(""),
    }).transform((v, ctx) => {
        if (!v.isValid) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t`Invalid signature message`,
            });
            return z.NEVER;
        }
        if (!v.profileId && !v.requesterFid) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t`No profile found`,
            });
            return z.NEVER;
        }
        if (v.buttonIndex < 1 || v.buttonIndex > POLL_OPTIONS_MAX_COUNT) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t`Invalid action: buttonIndex=${v.buttonIndex}`,
            });
            return z.NEVER;
        }
        return v;
    });

    return schema.parse(ctx);
};
