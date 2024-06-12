
import { ZodError } from "zod";

import { frames } from "@/config/frames";
import { IMAGE_QUERY_SCHEMA } from "@/constants/zod";
import { createFrameErrorResponse } from "@/helpers/createFrameErrorResponse";

type FrameRequestHandler = Parameters<typeof frames>[0]

const getErrorMessage = (error: unknown) => {
    if (error instanceof ZodError) {
        return (
            'InvalidParams: ' +
            error.issues.map((issue) => `(${issue.code})${issue.path.join('.')}: ${issue.message}`).join('; ')
        );
    }
    return error instanceof Error ? error.message : `${error}`;
}

export const withFrameRequestErrorHandler = () => {
    return (handler: FrameRequestHandler) => {
        return async (ctx: Parameters<FrameRequestHandler>[0]) => {
            try {
                return await handler(ctx);
            } catch (error) {
                const { data, success } = IMAGE_QUERY_SCHEMA.safeParse(ctx.searchParams);
                return createFrameErrorResponse({
                    text: getErrorMessage(error),
                    queryData: !success ? null : { ...data, date: `${Date.now()}` },
                });
            }
        }
    };
};
