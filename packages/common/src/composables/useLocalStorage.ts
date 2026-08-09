import { ref, watch, type Ref } from 'vue';
import { hasValue, deserialize, serialize, type Undefinable } from '@almighty-shogun/utils';

type UseLocalStorageOptions<T> = {
    prefix?: Undefinable<string>;
    deserializer?(value: string, defaultValue: T): T;
    serializer?(value: T): string;
};

export default function <T extends {}>(key: string, defaultValue: T, options: UseLocalStorageOptions<T> = {}): Ref<T> {
    if (typeof window === 'undefined') {
        return ref(defaultValue) as Ref<T>;
    }

    const {
        prefix,
        deserializer = deserialize,
        serializer = serialize
    } = options;

    const storageKey = `${prefix ? `${prefix}/` : ''}${key}`;

    function read(): T {
        try {
            const storedValue = localStorage.getItem(storageKey);

            if (!hasValue(storedValue)) {
                return defaultValue;
            }

            return deserializer(storedValue, defaultValue);
        } catch (error) {
            console.warn(`[useLocalStorage] Could not read "${storageKey}" from local storage.`, error);

            return defaultValue;
        }
    }

    const value = ref(read()) as Ref<T>;

    watch(value, currentValue => {
        try {
            if (!hasValue(currentValue)) {
                localStorage.removeItem(storageKey);

                return;
            }

            localStorage.setItem(storageKey, serializer(currentValue));
        } catch (error) {
            console.warn(`[useLocalStorage] Could not write "${storageKey}" to local storage.`, error);
        }
    }, { deep: true });

    return value;
}
