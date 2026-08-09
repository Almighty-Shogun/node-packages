import type { Nullable, NullableOrUndefinable } from './types';

export default function <T>(value: NullableOrUndefinable<T>): Nullable<T> {
    if (value === null || value === undefined) {
        return null;
    }

    const isEmptyArray = Array.isArray(value) && value.length === 0;
    const isEmptyString = typeof value === 'string' && value.trim().length === 0;

    if (isEmptyArray || isEmptyString) {
        return null;
    }

    return value;
}
