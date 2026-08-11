export default function (body: unknown): string {
    return encodeURIComponent(JSON.stringify(body ?? null));
}
