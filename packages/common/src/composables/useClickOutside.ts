import { unwrapElement } from '../util';
import useEventListener from './useEventListener';
import { toValue, type MaybeRefOrGetter } from 'vue';
import type { ComponentElement } from '../internal';
import type { Arrayable, NullableOrUndefinable, Promisable } from '@almighty-shogun/utils';

type OutsideClickHandler = (event: PointerEvent) => Promisable<void>;

export default function (
    targets: Arrayable<MaybeRefOrGetter<NullableOrUndefinable<ComponentElement>>>,
    callback: OutsideClickHandler,
    enabled: MaybeRefOrGetter<boolean> = true
): UseClickOutside {
    const sources = Array.isArray(targets) ? targets : [targets];
    const source = typeof document === 'undefined' ? null : document;

    return useEventListener(source, 'pointerdown', event => {
        if (!toValue(enabled)) {
            return;
        }

        const path = event.composedPath();

        const clickedInside = sources.some(source => {
            const element = unwrapElement(source);

            if (!element) {
                return;
            }

            return path.includes(element);
        });

        !clickedInside && callback(event);
    });
};

type UseClickOutside = () => void;
