import { DateTime } from 'luxon';
import isClassInstance from './isClassInstance';

interface TypeHandler {
    matches(value: unknown): boolean;
    serialize(value: any): string;
    deserialize(value: string): unknown;
    isValid?(value: any, raw: string): boolean;
}

const handlers: TypeHandler[] = [
    {
        matches: value => typeof value === 'string',
        serialize: value => value,
        deserialize: value => value,
    },
    {
        matches: value => typeof value === 'number',
        serialize: value => value.toString(),
        deserialize: value => Number(value),
        isValid: value => !Number.isNaN(value),
    },
    {
        matches: value => typeof value === 'boolean',
        serialize: value => value.toString(),
        deserialize: value => value === 'true',
        isValid: (_, raw) => raw === 'true' || raw === 'false',
    },
    {
        matches: value => typeof value === 'bigint',
        serialize: value => value.toString(),
        deserialize: value => BigInt(value),
    },
    {
        matches: value => value === null,
        serialize: () => 'null',
        deserialize: () => null,
    },
    {
        matches: value => value === undefined,
        serialize: () => 'undefined',
        deserialize: () => undefined,
    },
    {
        matches: DateTime.isDateTime,
        serialize: value => value.toISO() ?? '',
        deserialize: value => DateTime.fromISO(value),
        isValid: value => value.isValid,
    },
    {
        matches: value => value instanceof Date,
        serialize: value => value.toISOString(),
        deserialize: value => new Date(value),
        isValid: value => !Number.isNaN(value.getTime()),
    },
    {
        matches: value => value instanceof URL,
        serialize: value => value.toString(),
        deserialize: value => new URL(value),
    },
    {
        matches: value => value instanceof Set,
        serialize: value => JSON.stringify([...value]),
        deserialize: value => new Set(JSON.parse(value)),
    },
    {
        matches: value => value instanceof Map,
        serialize: value => JSON.stringify([...value]),
        deserialize: value => new Map(JSON.parse(value)),
    }
];

export function serialize<T>(value: T): string {
    const handler = handlers.find(handler => handler.matches(value));

    if (handler) {
        return handler.serialize(value);
    }

    return JSON.stringify(value);
}

export function deserialize<T>(value: string, defaultValue: T): T {
    try {
        const handler = handlers.find(handler => handler.matches(defaultValue));

        if (handler) {
            const result = handler.deserialize(value);

            return handler.isValid && !handler.isValid(result, value) ? defaultValue : result as T;
        }

        const parsed = JSON.parse(value);

        if (isClassInstance(defaultValue)) {
            return Object.assign(Object.create(Object.getPrototypeOf(defaultValue)), parsed) as T;
        }

        return parsed as T;
    } catch {
        return defaultValue;
    }
}
