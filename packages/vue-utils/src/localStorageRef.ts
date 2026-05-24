import { DateTime } from 'luxon'
import { ref, watch, type Ref } from 'vue'

function serialize<T>(value: T): string {
    if (DateTime.isDateTime(value)) {
        return value.toISO() ?? "";
    }

    return JSON.stringify(value);
}

function deserialize<T>(value: string, defaultValue: T): T {
    if (DateTime.isDateTime(defaultValue)) {
        return DateTime.fromISO(value) as T;
    }

    return JSON.parse(value) as T;
}

export default function <T>(key: string, defaultValue: T | null): Ref<T | null> {
    const localStorageValue = localStorage.getItem(key);
    let initialValue: T | null = defaultValue;

    if (localStorageValue !== null && defaultValue !== null) {
        try {
            initialValue = deserialize(localStorageValue, defaultValue);
        } catch {
            localStorage.removeItem(key);
        }
    }

    const localStorageRef: Ref<T | null> = ref<T | null>(initialValue) as Ref<T | null>;

    watch(localStorageRef, value => {
        if (value === null || value === undefined) {
            localStorage.removeItem(key);

            return;
        }

        localStorage.setItem(key, serialize(value));
    }, { deep: true });

    return localStorageRef;
}
