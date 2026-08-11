export default class InvalidHandlerResultError extends Error {
    public readonly method: string;
    public readonly pathname: string;

    public constructor(method: string, pathname: string) {
        super(`Route handler for ${method} ${pathname} did not return an HttpResponse.`);

        this.method = method;
        this.pathname = pathname;
        this.name = 'InvalidHandlerResultError';
    }
}
