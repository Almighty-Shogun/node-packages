import { useRoute } from 'vue-router';
import { ref, watch, type Ref } from 'vue';

function deserialize<T>(value: string, defaultValue: T): T {
    if (typeof defaultValue === 'number') {
        return Number(value) as T;
    }

    return value as T;
}

export default function <T = string>(name: string, defaultValue: T | null = null): Ref<T | null> {
    const route = useRoute();
    const parameter: Ref<T | null> = ref<T | null>(null) as Ref<T | null>;

    watch(() => route.params[name], value => {
        if (typeof value !== 'string') {
            parameter.value = defaultValue;
            return;
        }

        parameter.value = defaultValue !== null ? deserialize(value, defaultValue) : value as T;
    }, { immediate: true });

    return parameter;
}
