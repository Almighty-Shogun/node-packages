import { onMounted, onUnmounted, ref, unref, watch, type MaybeRef } from 'vue'

export default function (ms: MaybeRef<number>, fn: Function): UseInterval {
    const intervalId = ref<number|null>(null);

    function stop(): void {
        if (!intervalId.value) return;

        clearInterval(intervalId.value);
        intervalId.value = null;
    }

    function start(): void {
        stop();
        intervalId.value = setInterval(fn, unref(ms));
    }

    onMounted(() => start());
    onUnmounted(() => stop());

    watch(() => unref(ms), () => start());

    return {
        start,
        stop
    };
};

type UseInterval = {
    start(): void;
    stop(): void;
};
