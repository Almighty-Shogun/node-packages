import type { HtmlRouteDefinition } from '../types';
import { EmptyHtmlRoutePathsError } from '../errors';

export default function (definition: HtmlRouteDefinition): readonly string[] {
    const paths = Array.isArray(definition.path) ? definition.path : [definition.path];

    if (paths.length === 0) {
        throw new EmptyHtmlRoutePathsError();
    }

    return paths;
}
