export default class EmptyCronExpressionError extends Error {
    public constructor() {
        super('A scheduled task cannot have an empty cron expression.');

        this.name = 'EmptyCronExpressionError';
    }
}
