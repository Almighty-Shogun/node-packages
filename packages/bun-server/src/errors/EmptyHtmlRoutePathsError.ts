export default class EmptyHtmlRoutePathsError extends Error {
    public constructor() {
        super('An HTML route must be given at least one path.');

        this.name = 'EmptyHtmlRoutePathsError';
    }
}
