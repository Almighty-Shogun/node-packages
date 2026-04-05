import { customRef } from 'vue'
import type { RequiredRef } from './internal/types'

const UNINITIALIZED = Symbol('requiredRef.uninitialized');

export default function <T>(): RequiredRef<T> {
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
