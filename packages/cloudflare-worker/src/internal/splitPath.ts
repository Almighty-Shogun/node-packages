export default function (path: string): string[] {
    return path
        .split('/')
        .filter((segment) => segment.length > 0);
}
