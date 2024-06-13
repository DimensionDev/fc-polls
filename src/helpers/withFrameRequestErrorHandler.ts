import { ZodError } from 'zod';

import { frames } from '@/config/frames';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { createFrameErrorResponse } from '@/helpers/createFrameErrorResponse';

type FrameRequestHandler = Parameters<typeof frames>[0];

const collectDataFromError = (error: unknown) => {
    if (error instanceof ZodError) {
        return {
            cause: void 0,
            message:
                'InvalidParams: ' +
                error.issues.map((issue) => `(${issue.code})${issue.path.join('.')}: ${issue.message}`).join('; '),
        };
    }
    if (error instanceof Error) {
        return {
            cause: (error.cause as string) ?? void 0,
            message: error.message,
        };
    }
    return { cause: void 0, message: `${error}` };
};

export const withFrameRequestErrorHandler = () => {
    return (handler: FrameRequestHandler) => {
        return async (ctx: Parameters<FrameRequestHandler>[0]) => {
            try {
                return await handler(ctx);
            } catch (error) {
                const { data, success } = IMAGE_QUERY_SCHEMA.safeParse(ctx.searchParams);
                const { message, cause } = collectDataFromError(error);
                return createFrameErrorResponse({
                    text: message,
                    queryData: !success ? null : { ...data, date: `${Date.now()}` },
                    buttonLabel: cause,
                });
            }
        };
    };
};
