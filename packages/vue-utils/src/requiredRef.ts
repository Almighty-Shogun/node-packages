import { shallowRef } from 'vue'
import type { RequiredRef } from './internal/types'

export default function <T>(): RequiredRef<T> {
    const state = shallowRef<T | undefined>(undefined);

    return {
        ref: state,

        get value(): T {
            if (state.value === undefined) {
                throw new Error('Required ref accessed before initialization');
            }

            return state.value;
        },

        set value(value: T) {
            state.value = value;
        }
    };
}
