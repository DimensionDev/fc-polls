import { LensFrameRequest } from "@/types/lens";

export function isLensFrameActionPayload(frameActionPayload: unknown): frameActionPayload is LensFrameRequest {
    return (
        typeof frameActionPayload === 'object' &&
        frameActionPayload !== null &&
        'clientProtocol' in frameActionPayload &&
        typeof frameActionPayload.clientProtocol === 'string' &&
        frameActionPayload.clientProtocol.startsWith('lens@')
    );
}
