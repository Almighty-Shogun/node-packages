import type { MiddlewareDefinition, MiddlewareHandler } from './types';

export default function <const Name extends string>(name: Name, handler: MiddlewareHandler): MiddlewareDefinition<Name> {
    return Object.freeze({
        name,
        handler
    });
};
