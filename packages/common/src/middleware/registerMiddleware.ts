import { collectMiddleware } from '../internal';
import type { RegisterMiddlewareOptions } from './types';
import type { NavigationGuardReturn, Router } from 'vue-router';

export default function (router: Router, options: RegisterMiddlewareOptions = {}): () => void {
    const global = options.global ?? [];
    const except = options.except ?? [];

    return router.beforeEach(async (to, from): Promise<NavigationGuardReturn> => {
        for (const { handler } of collectMiddleware(to, global, except)) {
            const result = await handler(to, from);

            if (result !== undefined && result !== true) {
                return result;
            }
        }

        return true;
    });
};
