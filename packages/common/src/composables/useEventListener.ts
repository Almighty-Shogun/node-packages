import { unwrapTarget } from '../util';
import type { ComponentTarget } from '../internal';
import { getCurrentScope, onScopeDispose, watch, type MaybeRefOrGetter } from 'vue';
import type { Arrayable, Undefinable, NullableOrUndefinable } from '@almighty-shogun/utils';

type EventMap = HTMLElementEventMap & WindowEventMap & DocumentEventMap;

export default function <TEvent extends keyof EventMap>(
    source: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>,
    events: Arrayable<TEvent>,
    handler: (evt: EventMap[TEvent]) => void,
    options?: Undefinable<AddEventListenerOptions | boolean>
): UseEventListener {
    if (typeof document === 'undefined') {
        return () => {};
    }

    const eventNames = Array.isArray(events) ? events : [events];

    let detach: Undefinable<(() => void)>;

    const stopwatch = watch(() => unwrapTarget(source), target => {
        detach?.();
        detach = undefined;

        if (!target) {
            return;
        }

        const listener = handler as EventListener;

        eventNames.forEach(event => target.addEventListener(event, listener, options));

        detach = () => eventNames.forEach(event => target.removeEventListener(event, listener, options));
    }, { immediate: true });

    function dispose(): void {
        detach?.();
        detach = undefined;

        stopwatch();
    }

    if (getCurrentScope()) {
        onScopeDispose(dispose);
    }

    return dispose;
};

type UseEventListener = () => void;
