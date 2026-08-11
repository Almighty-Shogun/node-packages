export default class EmptyRouteCollectionError extends Error {
    public constructor() {
        super('The route collection does not export any routes.');

        this.name = 'EmptyRouteCollectionError';
    }
}
