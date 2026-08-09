import { customRef, toValue, isRef, watch, ref, type Ref, type MaybeRefOrGetter } from 'vue';

function debounce<TFunc extends (...args: any[]) => any>(fn: TFunc, delay: number, immediate: boolean = false): VoidFunction {
    let timeout: any;

    return (...args: any[]) => {
        if (immediate && !timeout) {
            fn(...args);
        }

        clearTimeout(timeout);

        timeout = setTimeout(() => requestAnimationFrame(() => fn(...args)), delay);
    };
}

export default function <T>(initialValue: MaybeRefOrGetter<T>, delay: number, immediate: boolean = false): Ref<T> {
    const state = ref<T>(toValue(initialValue));

    const debounced = customRef((track, trigger) => ({
        get() {
            track();
            return state.value;
        },

        set: debounce(value => {
            state.value = value;
            trigger();
        }, delay, immediate)
    })) as Ref<T>;

    if (isRef(initialValue)) {
        watch(initialValue, value => debounced.value = value);
    }

    return debounced;
}
