import { toValue, type MaybeRefOrGetter } from 'vue';
import { copyToClipboard, type Undefinable } from '@almighty-shogun/utils';

export default function (value: MaybeRefOrGetter<string>, onSuccess?: Undefinable<Function>): UseClipboard {
    return async () => {
        const success = await copyToClipboard(toValue(value));

        success && onSuccess?.();
    };
}

type UseClipboard = () => void;
