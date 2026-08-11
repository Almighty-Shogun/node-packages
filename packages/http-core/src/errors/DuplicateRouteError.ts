export default class DuplicateRouteError extends Error {
    public readonly method: string;
    public readonly path: string;

    public constructor(method: string, path: string) {
        super(`Duplicate route: ${method} ${path}`);

        this.method = method;
        this.path = path;
        this.name = 'DuplicateRouteError';
    }
}
