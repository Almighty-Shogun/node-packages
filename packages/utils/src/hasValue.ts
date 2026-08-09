import emptyOrNull from './emptyOrNull';
import type { NullableOrUndefinable } from './types';

export default function <T>(value: NullableOrUndefinable<T>): value is T {
    return emptyOrNull(value) !== null;
}
