import type { MiddlewareDefinition } from '../middleware';
import type { RouteLocationNormalized, RouteRecordName } from 'vue-router';

function isExcepted(to: RouteLocationNormalized, except: readonly NonNullable<RouteRecordName>[]): boolean {
    if (except.length === 0) {
        return false;
    }

    return to.matched.some(record => record.name !== undefined && except.includes(record.name));
}

export default function (
    to: RouteLocationNormalized,
    global: readonly MiddlewareDefinition[],
    except: readonly NonNullable<RouteRecordName>[]
): MiddlewareDefinition[] {
    const names = new Set<string>();
    const skipped = new Set<string>();
    const collected: MiddlewareDefinition[] = [];

    function add(definition: MiddlewareDefinition): void {
        if (names.has(definition.name)) {
            return;
        }

        names.add(definition.name);
        collected.push(definition);
    }

    if (!isExcepted(to, except)) {
        for (const definition of global) {
            add(definition);
        }
    }

    for (const record of to.matched) {
        for (const definition of record.meta.middleware ?? []) {
            add(definition);
        }

        for (const definition of record.meta.skipMiddleware ?? []) {
            skipped.add(definition.name);
        }
    }

    return collected.filter(definition => !skipped.has(definition.name));
}
