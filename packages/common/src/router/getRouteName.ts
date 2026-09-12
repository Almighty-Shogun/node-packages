import type { TreeNode } from 'vue-router/unplugin';
import type { Undefinable } from '@almighty-shogun/utils';

function pascalCase(value: string): string {
    return value
        .split(/[-_]/g)
        .filter(Boolean)
        .map(part => part[0].toUpperCase() + part.slice(1))
        .join('');
}

export default function (route: TreeNode): string {
    const segments: string[] = [];

    for (let node: Undefinable<TreeNode> = route; node && node.parent; node = node.parent) {
        const segment = node.value.subSegments
            .map(subSegment => pascalCase(typeof subSegment === 'string' ? subSegment : subSegment.paramName))
            .join('');

        if (segment) {
            segments.unshift(segment);
        }
    }

    return segments.join('.') || 'Home';
}
