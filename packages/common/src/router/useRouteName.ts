import { useRoute } from 'vue-router';
import { computed, type ComputedRef } from 'vue';
import type { Nullable } from '@almighty-shogun/utils';

export default function (): ComputedRef<Nullable<string>> {
    const route = useRoute();

    return computed(() => route?.name?.toString() ?? null);
}
