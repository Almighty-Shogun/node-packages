export default class ScheduledTasksFailedError extends AggregateError {
    public readonly cron: string;

    public constructor(cron: string, errors: readonly unknown[]) {
        super(errors, `${errors.length} scheduled tasks failed for "${cron}".`);

        this.cron = cron;
        this.name = 'ScheduledTasksFailedError';
    }
}
