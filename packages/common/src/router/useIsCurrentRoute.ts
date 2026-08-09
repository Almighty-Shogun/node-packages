import useRouteNames from './useRouteNames';
import { toValue, computed, type ComputedRef } from 'vue';

export default function (route: string, strict: boolean = true): ComputedRef<boolean> {
    const names = useRouteNames();

    return computed(() => toValue(names).some(name => strict ? name === route : name.startsWith(route)));
}
