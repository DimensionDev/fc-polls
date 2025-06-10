export class InvalidFrameActionPayloadError extends Error {
    constructor(message = 'Invalid frame action payload') {
        super(message);
    }
}

export class RequestBodyNotJSONError extends Error {
    constructor() {
        super('Invalid frame action payload, request body is not JSON');
    }
}
