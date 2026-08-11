import type { HtmlRouteDefinition } from '../types';
import type { CollectedRouteDefinition } from './types';

export default function <WebSocketData>(definition: CollectedRouteDefinition<WebSocketData>): definition is HtmlRouteDefinition {
    return 'bundle' in definition;
}
