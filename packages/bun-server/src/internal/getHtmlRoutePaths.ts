import type { HtmlRouteDefinition } from '../types';

export default function (definition: HtmlRouteDefinition): readonly string[] {
    const paths = Array.isArray(definition.path) ? definition.path : [definition.path];

    if (paths.length === 0) {
        throw new Error('HTML route path array cannot be empty.');
    }

    return paths;
}
