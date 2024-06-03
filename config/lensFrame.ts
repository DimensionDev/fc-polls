import { getLensFrameMessage, isLensFrameActionPayload } from 'frames.js/lens';
import { openframes } from 'frames.js/middleware';

export const lensFrame = openframes({
    clientProtocol: {
        id: 'lens',
        version: '1.0.0',
    },
    handler: {
        isValidPayload: (body: JSON) => isLensFrameActionPayload(body),
        getFrameMessage: async (body: JSON) => {
            if (!isLensFrameActionPayload(body)) {
                return undefined;
            }
            const result = await getLensFrameMessage(body);

            return { ...result };
        },
    },
});
