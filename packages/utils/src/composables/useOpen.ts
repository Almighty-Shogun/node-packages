import { ref } from 'vue'

export default function () {
    const isOpen = ref<boolean>(false);

    return {
        isOpen,
        open: () => isOpen.value = true,
        close: () => isOpen.value = false,
        toggle: () => isOpen.value = !isOpen.value
    };
}
