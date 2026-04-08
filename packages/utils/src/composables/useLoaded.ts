import { ref } from 'vue'

export default function () {
    const isLoading = ref(false);

    async function load<T>(task: Promise<T>|(() => Promise<T>)): Promise<T> {
        isLoading.value = true;

        return await (typeof task === "function" ? task() : task)
            .finally(() => isLoading.value = false);
    }

    return {
        load,
        isLoading
    }
}
