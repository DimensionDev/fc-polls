import { development, FrameVerifySignatureResult, LensClient, production } from '@lens-protocol/client';

import { LensFrameOptions, LensFrameRequest, LensFrameResponse } from '@/types/lens';

type FrameRequest = LensFrameRequest & {
    untrustedData: {
        idToken?: string;
    };
};

export async function getLensFrameMessage(
    frameActionPayload: FrameRequest,
    options?: LensFrameOptions,
): Promise<
    LensFrameResponse & {
        walletAddress(): Promise<string | undefined>;
    }
> {
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
        idToken,
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
        identityToken: identityToken || idToken || '',
        signature: frameActionPayload.trustedData.messageBytes,
        signedTypedData: typedData,
    });

    return {
        ...typedData.value,
        isValid: response === FrameVerifySignatureResult.Verified,
        async walletAddress() {
            const profile = await lensClient.profile.fetch({
                forProfileId: typedData.value.profileId,
            });

            return profile?.ownedBy.address;
        },
    };
}
