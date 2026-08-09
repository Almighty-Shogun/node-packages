import { ref, type Ref } from 'vue';
import type { PromiseOrGetter } from '@almighty-shogun/utils';

export default function (): UseLoaded {
    const isLoading = ref<boolean>(false);

    async function load<T>(task: PromiseOrGetter<T>): Promise<T> {
        isLoading.value = true;

        // noinspection ES6MissingAwait
        const fn = typeof task === 'function' ? task() : task;

        return await fn.finally(() => isLoading.value = false);
    }

    return {
        load,
        isLoading
    };
};

type UseLoaded = {
    readonly isLoading: Ref<boolean>;

    load<T>(task: PromiseOrGetter<T>): Promise<T>;
};
