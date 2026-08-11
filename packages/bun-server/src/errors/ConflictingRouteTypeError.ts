export default class ConflictingRouteTypeError extends Error {
    public readonly path: string;

    public constructor(path: string) {
        super(`Route path "${path}" cannot be both an HTML route and a method route.`);

        this.path = path;
        this.name = 'ConflictingRouteTypeError';
    }
}
