type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cloneValue(value: unknown): unknown {
    if (Array.isArray(value)) {
        return value.map(cloneValue);
    }

    return isPlainObject(value) ? deepMerge({}, value) : value;
}

export default function deepMerge<TTarget extends PlainObject>(target: TTarget, source: PlainObject): TTarget {
    const result: PlainObject = { ...target };

    for (const [key, value] of Object.entries(source)) {
        if (value === undefined) {
            continue;
        }

        const existing = result[key];

        result[key] = isPlainObject(existing) && isPlainObject(value)
            ? deepMerge(existing, value)
            : cloneValue(value);
    }

    return result as TTarget;
}
