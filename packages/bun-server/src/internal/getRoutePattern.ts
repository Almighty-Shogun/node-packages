export default function (path: string): string {
    return path
        .split('/')
        .map((segment) => segment.startsWith(':') ? ':' : segment)
        .join('/');
}
