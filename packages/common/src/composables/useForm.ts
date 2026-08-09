import { ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue';

export default function <T>(spec: MaybeRefOrGetter<T>): UseForm<T> {
    const clone = (): T => structuredClone(toValue(spec));

    const form = ref<T>(clone()) as Ref<T>;

    function reset(): void {
        form.value = clone();
    }

    return {
        form,
        reset
    };
};

type UseForm<T> = {
    readonly form: Ref<T>;

    reset(): void;
}
