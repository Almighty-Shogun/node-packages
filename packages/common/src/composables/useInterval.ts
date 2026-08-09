import type { Nullable } from '@almighty-shogun/utils';
import { onMounted, onUnmounted, ref, watch, toValue, type MaybeRefOrGetter } from 'vue';

export default function (ms: MaybeRefOrGetter<number>, fn: Function): UseInterval {
    const intervalId = ref<Nullable<number>>(null);

    function stop(): void {
        if (!intervalId.value) return;

        clearInterval(intervalId.value);
        intervalId.value = null;
    }

    function start(): void {
        stop();
        intervalId.value = setInterval(fn, toValue(ms));
    }

    onMounted(() => start());
    onUnmounted(() => stop());

    watch(() => toValue(ms), () => start());

    return {
        start,
        stop
    };
};

type UseInterval = {
    start(): void;
    stop(): void;
};
