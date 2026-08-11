import type { ScheduledCollection, ScheduledDefinition } from '../types';
import { EmptyScheduledCollectionError, EmptyScheduledExportError, InvalidScheduledCollectionError } from '../errors';

export default function (scheduled: ScheduledCollection): ScheduledDefinition[] {
    if (!scheduled || typeof scheduled !== 'object' || Array.isArray(scheduled)) {
        throw new InvalidScheduledCollectionError();
    }

    const entries = Object.entries(scheduled)
        .sort(([left], [right]) => left.localeCompare(right));

    if (entries.length === 0) {
        throw new EmptyScheduledCollectionError();
    }

    let definitions: ScheduledDefinition[] = [];

    for (const [exportName, exportedTasks] of entries) {
        const taskDefinitions = Array.isArray(exportedTasks) ? exportedTasks : [exportedTasks];

        if (taskDefinitions.length === 0) {
            throw new EmptyScheduledExportError(exportName);
        }

        for (const definition of taskDefinitions) {
            definitions = [...definitions, definition];
        }
    }

    return definitions;
}
