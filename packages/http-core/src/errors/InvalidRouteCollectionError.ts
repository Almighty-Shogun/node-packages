export default class InvalidRouteCollectionError extends Error {
    public constructor() {
        super('Routes must be an imported route collection object.');

        this.name = 'InvalidRouteCollectionError';
    }
}
