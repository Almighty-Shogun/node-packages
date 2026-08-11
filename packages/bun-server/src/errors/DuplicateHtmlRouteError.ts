export default class DuplicateHtmlRouteError extends Error {
    public readonly path: string;

    public constructor(path: string) {
        super(`Duplicate HTML route: ${path}`);

        this.path = path;
        this.name = 'DuplicateHtmlRouteError';
    }
}
