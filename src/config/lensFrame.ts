import { getLensFrameMessage, isLensFrameActionPayload } from 'frames.js/lens';
import { openframes } from 'frames.js/middleware';

export const lensFrame = openframes({
    clientProtocol: {
        id: 'lens',
        version: '1.0.0',
    },
    handler: {
        isValidPayload: (body) => isLensFrameActionPayload(body),
        getFrameMessage: async (body) => {
            if (!isLensFrameActionPayload(body)) return;
            const result = await getLensFrameMessage(body);

            return { ...result };
        },
    },
});
