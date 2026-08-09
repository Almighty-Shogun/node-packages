import { ref, type Ref } from 'vue';
import type { Nullable, Undefinable } from '@almighty-shogun/utils';

export default function <T = never>(value?: Undefinable<T>): Ref<Nullable<T>> {
    return ref(value ?? null) as Ref<Nullable<T>>;
}
