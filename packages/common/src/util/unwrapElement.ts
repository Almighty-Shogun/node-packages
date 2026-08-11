import type { ComponentElement } from '../internal';
import { toValue, type MaybeRefOrGetter } from 'vue';
import { isHtmlElement, type NullableOrUndefinable, type Nullable } from '@almighty-shogun/utils';

export default function <TElement extends HTMLElement>(
    elementRef: MaybeRefOrGetter<NullableOrUndefinable<ComponentElement>>
): Nullable<TElement> {
    const element = toValue(elementRef);

    if (!element) {
        return null;
    }

    if (isHtmlElement(element)) {
        return element as TElement;
    }

    return element.$el ?? null;
}
