import { ref, type Ref } from 'vue'

export default function (): UseOpen {
    const isOpen = ref<boolean>(false);

    return {
        isOpen,
        open: () => isOpen.value = true,
        close: () => isOpen.value = false,
        toggle: () => isOpen.value = !isOpen.value
    };
};

type UseOpen = {
    readonly isOpen: Ref<boolean>;

    open(): void;
    close(): void;
    toggle(): void;
};
