export default class EmptyScheduledCollectionError extends Error {
    public constructor() {
        super('The scheduled collection does not export any tasks.');

        this.name = 'EmptyScheduledCollectionError';
    }
}
