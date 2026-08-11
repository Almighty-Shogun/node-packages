import { resolveQuery } from '../internal';

export default function (request: Request, name: string, fallback?: number): number {
    return resolveQuery(request, name, 'a number', fallback, (value) => {
        const trimmed = value.trim();
        const parsed = Number(trimmed);

        return trimmed.length > 0 && Number.isFinite(parsed) ? parsed : null;
    });
}
