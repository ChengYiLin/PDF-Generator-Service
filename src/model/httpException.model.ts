/**
 * Handling Http Exception
 */
class HttpException extends Error {
    /**
     * @param {number} errorCode
     * @param {string | any} message
     */
    constructor(
        public errorCode: number,
        public readonly message: string | any
    ) {
        super(message);
        this.errorCode = errorCode;
    }
}

export default HttpException;
