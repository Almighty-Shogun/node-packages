export default class InvalidScheduledCollectionError extends Error {
    public constructor() {
        super('Scheduled tasks must be an imported scheduled collection object.');

        this.name = 'InvalidScheduledCollectionError';
    }
}
