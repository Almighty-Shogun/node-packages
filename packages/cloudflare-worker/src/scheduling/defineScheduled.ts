import type { ScheduledDefinition, ScheduledHandler } from '../types';

export default function <const Cron extends string>(cron: Cron, handler: ScheduledHandler): ScheduledDefinition<Cron> {
    return Object.freeze({ cron, handler });
}
