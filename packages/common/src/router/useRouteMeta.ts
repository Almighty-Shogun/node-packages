import { deepMerge } from '../internal';
import { computed, type ComputedRef } from 'vue';
import { useRoute, type RouteMeta } from 'vue-router';

export default function (): ComputedRef<RouteMeta> {
    const route = useRoute();

    return computed(() => {
        let meta: RouteMeta = {};

        for (const record of route.matched) {
            meta = deepMerge(meta, record.meta);
        }

        return meta;
    });
};
