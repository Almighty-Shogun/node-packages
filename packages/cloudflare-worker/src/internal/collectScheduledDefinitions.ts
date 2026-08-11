import type { ScheduledCollection, ScheduledDefinition } from '../types';

export default function (scheduled: ScheduledCollection): ScheduledDefinition[] {
    if (!scheduled || typeof scheduled !== 'object' || Array.isArray(scheduled)) {
        throw new TypeError('Scheduled tasks must be an imported scheduled collection object.');
    }

    const entries = Object.entries(scheduled)
        .sort(([left], [right]) => left.localeCompare(right));

    if (entries.length === 0) {
        throw new Error('The scheduled collection does not export any tasks.');
    }

    let definitions: ScheduledDefinition[] = [];

    for (const [exportName, exportedTasks] of entries) {
        const taskDefinitions = Array.isArray(exportedTasks) ? exportedTasks : [exportedTasks];

        if (taskDefinitions.length === 0) {
            throw new Error(`Scheduled export "${exportName}" cannot be an empty array.`);
        }

        for (const definition of taskDefinitions) {
            definitions = [...definitions, definition];
        }
    }

    return definitions;
}
