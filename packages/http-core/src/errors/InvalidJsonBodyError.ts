export default class InvalidJsonBodyError extends Error {
    public constructor(cause: unknown) {
        super('Failed to serialize JSON response body.', { cause });

        this.name = 'InvalidJsonBodyError';
    }
}
