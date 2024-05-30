import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';

export enum ServerErrorCodes {
    UNKNOWN = 40001,
}

export const createErrorResponseJSONForLegacy = (res: NextApiResponse, message: string, init?: ResponseInit) => {
    return res.status(init?.status ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        headers: init?.headers,
        error: {
            code: ServerErrorCodes.UNKNOWN,
            message,
        },
    });
};
