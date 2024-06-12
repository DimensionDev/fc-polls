export type LensFrameRequest = {
    clientProtocol: string;
    untrustedData: {
        specVersion: string;
        profileId: string;
        pubId: string;
        url: string;
        buttonIndex: number;
        unixTimestamp: number;
        deadline: number;
        inputText: string;
        state: string;
        actionResponse: string;
        identityToken: string;
    };
    trustedData: {
        messageBytes: string;
    };
};

export type LensFrameVerifiedFields = {
    url: string;
    buttonIndex: number;
    profileId: string;
    pubId: string;
    inputText: string;
    state: string;
    actionResponse: string;
    deadline: number;
    specVersion: string;
};

export type LensFrameResponse = LensFrameVerifiedFields & {
    isValid: boolean;
};

export type LensFrameOptions = {
    environment?: 'production' | 'development';
};
