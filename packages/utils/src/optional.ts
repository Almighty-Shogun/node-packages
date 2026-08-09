import type { NullableOrUndefinable, Nullable, Arrayable } from './types';

export default function optional<T, U extends {}>(value: U[], callback: (value: U) => T): T[];

export default function optional<T, U extends {}>(value: U, callback: (value: U) => T): T;

export default function optional<T, U>(value: NullableOrUndefinable<U[]>, callback: (value: U) => T): Nullable<T[]>;

export default function optional<T, U>(value: NullableOrUndefinable<U>, callback: (value: U) => T): Nullable<T>;

export default function optional<T, U>(value: NullableOrUndefinable<Arrayable<U>>, callback: (value: U) => T): Nullable<Arrayable<T>> {
    if (value === null || value === undefined) {
        return null;
    }

    if (Array.isArray(value)) {
        return value.map(callback);
    }

    return callback(value);
}
