import { onMounted, onUnmounted, ref } from 'vue'

export default function (ms: number, fn: Function) {
    const intervalId = ref<any>();

    function start(): void {
        intervalId.value = setInterval(fn, ms);
    }

    onMounted(() => start());
    onUnmounted(() => clearInterval(intervalId.value));
};
