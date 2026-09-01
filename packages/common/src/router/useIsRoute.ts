import useRouteNames from './useRouteNames';
import { toValue, computed, type ComputedRef } from 'vue';

type IsRoute = (route: string, strict?: boolean) => boolean;

export default function (): IsRoute;

export default function (route: string, strict?: boolean): ComputedRef<boolean>;

export default function (route?: string, strict: boolean = true): ComputedRef<boolean> | IsRoute {
    const names = useRouteNames();
    const isRoute: IsRoute = (route, strict = true) => toValue(names).some(name => strict ? name === route : name.startsWith(route));

    if (route === undefined) {
        return isRoute;
    }

    return computed(() => isRoute(route, strict));
}
