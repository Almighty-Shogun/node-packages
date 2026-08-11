import { unwrapTarget } from '../util';
import useEventListener from './useEventListener';
import type { ComponentTarget } from '../internal';
import type { NullableOrUndefinable } from '@almighty-shogun/utils';
import { ref, watch, onMounted, type Ref, type MaybeRefOrGetter } from 'vue';

export default function (target?: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>): UseScrollPosition {
    const scrollX = ref<number>(0);
    const scrollY = ref<number>(0);

    if (typeof document === 'undefined') {
        return { scrollX, scrollY };
    }

    const resolved = target ?? ref(document);

    function update(): void {
        const element = unwrapTarget(resolved);

        if (!element) {
            return;
        }

        if (element instanceof Window) {
            scrollX.value = element.scrollX;
            scrollY.value = element.scrollY;
        } else if (element instanceof Document) {
            scrollX.value = element.scrollingElement?.scrollLeft ?? 0;
            scrollY.value = element.scrollingElement?.scrollTop ?? 0;
        } else {
            scrollX.value = element.scrollLeft;
            scrollY.value = element.scrollTop;
        }
    }

    useEventListener(resolved, 'scroll', update, { passive: true });

    onMounted(update);

    watch(() => unwrapTarget(resolved), update);

    return {
        scrollX,
        scrollY
    };
}

type UseScrollPosition = {
    readonly scrollX: Ref<number>;
    readonly scrollY: Ref<number>;
};
