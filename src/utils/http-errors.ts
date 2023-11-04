class HttpErrors extends Error {
    public message: string;
    public code: number;

    constructor(message: string, errorCode: number) {
        super(message); // Add "message" property
        this.code = errorCode; // Adds a "code" property
    }
}
module.exports = HttpErrors;

function createHttpError(message: string, errorCode: number) {
    const error = new Error(message) as HttpErrors;
    error.code = errorCode;
    return error;
}

interface HttpErrors extends Error {
    code: number;
}

export default createHttpError;
