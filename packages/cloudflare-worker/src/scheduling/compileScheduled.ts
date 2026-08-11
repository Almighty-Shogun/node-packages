import { collectScheduledDefinitions } from '../internal';
import type { CompiledScheduled, CompiledScheduledCollection, ScheduledCollection, ScheduledHandler } from '../types';

export default function (collection: ScheduledCollection): CompiledScheduledCollection {
    const definitions = collectScheduledDefinitions(collection);
    const grouped = new Map<string, ScheduledHandler[]>();

    for (const definition of definitions) {
        const cron = definition.cron.trim();

        if (cron.length === 0) {
            throw new Error('A scheduled task cannot have an empty cron expression.');
        }

        const handlers = grouped.get(cron) ?? [];

        grouped.set(cron, handlers);
        handlers.push(definition.handler);
    }

    const compiled: CompiledScheduled[] = [];

    for (const [cron, handlers] of grouped) {
        compiled.push({ cron, handlers });
    }

    return compiled.sort((left, right) => left.cron.localeCompare(right.cron));
}
