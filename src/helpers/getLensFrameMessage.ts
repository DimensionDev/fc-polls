import { development, FrameVerifySignatureResult, LensClient, production } from '@lens-protocol/client';

import { LensFrameOptions, LensFrameRequest, LensFrameResponse } from '@/types/lens';

export async function getLensFrameMessage(
    frameActionPayload: LensFrameRequest,
    options?: LensFrameOptions,
): Promise<LensFrameResponse> {
    const lensClientEnvironment = options?.environment === 'development' ? development : production;

    const lensClient = new LensClient({
        environment: lensClientEnvironment,
    });

    const {
        url,
        inputText,
        state,
        buttonIndex,
        actionResponse,
        profileId,
        pubId,
        specVersion,
        deadline,
        identityToken,
    } = frameActionPayload.untrustedData;

    const typedData = await lensClient.frames.createFrameTypedData({
        url,
        inputText,
        state,
        buttonIndex,
        actionResponse,
        profileId,
        pubId,
        specVersion,
        deadline,
    });

    const response = await lensClient.frames.verifyFrameSignature({
        identityToken,
        signature: frameActionPayload.trustedData.messageBytes,
        signedTypedData: typedData,
    });

    return {
        ...typedData.value,
        isValid: response === FrameVerifySignatureResult.Verified,
    };
}
