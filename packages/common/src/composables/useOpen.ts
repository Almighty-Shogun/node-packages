import { ref, toValue, type Ref, type MaybeRefOrGetter } from 'vue';

export default function (state: MaybeRefOrGetter<boolean> = false): UseOpen {
    const isOpen = ref<boolean>(toValue(state));

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
