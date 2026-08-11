import type { CompiledRoute } from '../types';

export default function (left: CompiledRoute, right: CompiledRoute): number {
    const length = Math.max(left.segments.length, right.segments.length);

    for (let index = 0; index < length; index++) {
        const leftSegment = left.segments[index];
        const rightSegment = right.segments[index];

        if (leftSegment === rightSegment) {
            continue;
        }

        if (leftSegment === undefined) {
            return -1;
        }

        if (rightSegment === undefined) {
            return 1;
        }

        const leftDynamic = leftSegment.startsWith(':');
        const rightDynamic = rightSegment.startsWith(':');

        if (leftDynamic !== rightDynamic) {
            return leftDynamic ? 1 : -1;
        }

        return leftSegment.localeCompare(rightSegment);
    }

    return 0;
}
