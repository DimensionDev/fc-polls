import { openframes } from 'frames.js/middleware';

import { getLensFrameMessage } from '@/helpers/getLensFrameMessage';
import { isLensFrameActionPayload } from '@/helpers/isLensFrameActionPayload';

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
