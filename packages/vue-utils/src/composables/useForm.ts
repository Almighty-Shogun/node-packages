import { ref, type Ref } from 'vue'

export default function <T>(spec: T): UseForm<T> {
    const clone = (): T => structuredClone(spec);
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
