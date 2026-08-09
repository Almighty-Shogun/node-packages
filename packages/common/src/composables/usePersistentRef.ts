import { ref, watch, type Ref } from 'vue';
import { hasValue, deserialize, serialize, type Nullable } from '@almighty-shogun/utils';

export default function persistentRef(key: string, defaultValue: null): Ref<Nullable<string>>;

export default function persistentRef<T extends {}>(key: string, defaultValue: T): Ref<Nullable<T>>;

export default function persistentRef<T extends {}>(key: string, defaultValue: Nullable<T>): Ref<Nullable<T | string>> {
    if (typeof window === 'undefined') {
        return ref(defaultValue) as Ref<Nullable<T | string>>;
    }

    let initialValue: Nullable<T | string> = defaultValue;

    try {
        const localStorageValue = localStorage.getItem(key);

        if (hasValue(localStorageValue)) {
            initialValue = hasValue(defaultValue)
                ? deserialize(localStorageValue, defaultValue)
                : localStorageValue;
        }
    } catch (error) {
        console.warn(`[usePersistentRef] Could not read "${key}" from local storage.`, error);
    }

    const localStorageRef = ref(initialValue) as Ref<Nullable<T | string>>;

    watch(localStorageRef, value => {
        try {
            if (!hasValue(value)) {
                localStorage.removeItem(key);

                return;
            }

            localStorage.setItem(key, serialize(value));
        } catch (error) {
            console.warn(`[usePersistentRef] Could not write "${key}" to local storage.`, error);
        }
    }, { deep: true });

    return localStorageRef;
}
