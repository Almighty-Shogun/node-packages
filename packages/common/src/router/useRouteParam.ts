import { useRoute } from 'vue-router';
import { ref, watch, type Ref } from 'vue';
import { hasValue, deserialize, type Nullable } from '@almighty-shogun/utils';

export default function <T = string>(name: string, defaultValue: Nullable<T> = null): Ref<Nullable<T>> {
    const route = useRoute();

    const parameter: Ref<Nullable<T>> = ref<Nullable<T>>(null) as Ref<Nullable<T>>;

    watch(() => route.params[name], value => {
        if (hasValue(value)) {
            parameter.value = hasValue(defaultValue) ? deserialize(value as string, defaultValue) : value as T;
            return;
        }

        parameter.value = hasValue(defaultValue) ? defaultValue : null;
    }, { immediate: true });

    return parameter;
}
