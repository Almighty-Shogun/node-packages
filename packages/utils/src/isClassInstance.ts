import hasValue from './hasValue';

export default function (value: unknown): value is object {
    return typeof value === 'object'
        && hasValue(value)
        && !Array.isArray(value)
        && value.constructor !== Object;
}
