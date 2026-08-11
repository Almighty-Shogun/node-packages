import { deepMerge } from '../internal';
import { computed, type ComputedRef, type DeepReadonly } from 'vue';
import { useRoute, type RouteMeta } from 'vue-router';

export default function (): ComputedRef<DeepReadonly<RouteMeta>> {
    const route = useRoute();

    return computed(() => {
        let meta: RouteMeta = {};

        for (const record of route.matched) {
            meta = deepMerge(meta, record.meta);
        }

        return meta as DeepReadonly<RouteMeta>;
    });
};
