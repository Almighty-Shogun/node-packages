export default function (segments: readonly string[]): string {
    return segments
        .map((segment) => segment.startsWith(':') ? ':' : segment)
        .join('/');
}
