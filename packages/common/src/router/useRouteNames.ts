import { useRoute } from 'vue-router';
import { hasValue } from '@almighty-shogun/utils';
import { computed, ComputedRef, toValue } from 'vue';

export default function (): ComputedRef<string[]> {
    const route = useRoute();

    return computed(() => {
        let names: string[] = [];

        toValue(route).matched
            .filter(matched => hasValue(matched.name))
            .forEach(matched => names = [...names, matched.name as string]);

        return names;
    });
}
