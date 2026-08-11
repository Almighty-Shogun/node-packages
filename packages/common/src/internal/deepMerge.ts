type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export default function deepMerge<TTarget extends PlainObject>(target: TTarget, source: PlainObject): TTarget {
    const result: PlainObject = { ...target };

    for (const [key, value] of Object.entries(source)) {
        if (value === undefined) {
            continue;
        }

        const existing = result[key];

        result[key] = isPlainObject(existing) && isPlainObject(value) ? deepMerge(existing, value) : value;
    }

    return result as TTarget;
}
