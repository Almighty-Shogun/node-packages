import { customRef, type Ref } from 'vue'

const UNINITIALIZED = Symbol('requiredRef.uninitialized');

export default function <T>(): Ref<T> {
    let state: T | typeof UNINITIALIZED = UNINITIALIZED;

    return customRef<T>((track, trigger) => ({
        get(): T {
            track();

            if (state === UNINITIALIZED) {
                throw new Error('Required ref accessed before initialization');
            }

            return state;
        },

        set(value: T): void {
            state = value;
            trigger();
        }
    }));
}
