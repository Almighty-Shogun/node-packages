import type { ComponentTarget } from '../internal/types';
import { toValue, type ComponentPublicInstance, type MaybeRefOrGetter } from 'vue';
import { isHtmlElement, type NullableOrUndefinable, type Nullable, type HTMLTarget } from '@almighty-shogun/utils';

export default function (target: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>): Nullable<HTMLTarget> {
    const value = toValue(target);

    if (!value) {
        return null;
    }

    if (typeof Window !== 'undefined' && (value instanceof Window || value instanceof Document) || isHtmlElement(value)) {
        return value;
    }

    return (value as ComponentPublicInstance).$el ?? null;
}
