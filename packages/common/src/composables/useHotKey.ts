import useEventListener from './useEventListener';
import { toValue, type MaybeRefOrGetter } from 'vue';
import { parseHotKey, matchesHotKey, isOnApplePlatform, isEditable } from '../internal/hotKeys';
import type { ComponentTarget } from '../internal/types';
import { hasValue, type Undefinable, type NullableOrUndefinable, type Arrayable } from '@almighty-shogun/utils';

type HotKeyHandler = (event: KeyboardEvent) => void;

export type UseHotKeyOptions = {
    target?: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>;
    enabled?: MaybeRefOrGetter<Undefinable<boolean>>;
    event?: Undefinable<'keydown' | 'keyup'>;
    preventDefault?: Undefinable<boolean>;
    stopPropagation?: Undefinable<boolean>;
    ignoreWhileTyping?: Undefinable<boolean>;
    repeat?: Undefinable<boolean>;
};

export default function (hotKeys: Arrayable<string>, handler: HotKeyHandler, options: UseHotKeyOptions = {}): () => void {
    const {
        target,
        enabled,
        event = 'keydown',
        preventDefault = true,
        stopPropagation = false,
        ignoreWhileTyping = true,
        repeat = false,
    } = options;

    const parsedHotKeys = (Array.isArray(hotKeys) ? hotKeys : [hotKeys]).map(parseHotKey);

    function resolveTarget(): NullableOrUndefinable<ComponentTarget> {
        if (hasValue(target)) {
            return toValue(target);
        }

        return typeof window !== 'undefined' ? window : null;
    }

    function handleEvent(event: KeyboardEvent): void {
        if (enabled !== undefined && !toValue(enabled)) {
            return;
        }

        if (event.repeat && !repeat) {
            return;
        }

        for (const hotKey of parsedHotKeys) {
            if (!matchesHotKey(event, hotKey)) {
                continue;
            }

            const apple = isOnApplePlatform();
            const usesCtrl = hotKey.ctrl || (hotKey.mod && !apple);
            const usesMeta = hotKey.meta || (hotKey.mod && apple);

            if (ignoreWhileTyping && !usesCtrl && !usesMeta && isEditable(event.target)) {
                return;
            }

            if (preventDefault) {
                event.preventDefault();
            }

            if (stopPropagation) {
                event.stopPropagation();
            }

            handler(event);

            return;
        }
    }

    return useEventListener(resolveTarget, event, handleEvent);
}
