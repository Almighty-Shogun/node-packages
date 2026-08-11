import { resolveQuery } from '../internal';

export default function (request: Request, name: string, fallback?: number): number {
    return resolveQuery(request, name, 'a whole number', fallback, (value) => {
        const trimmed = value.trim();
        const parsed = Number(trimmed);

        return trimmed.length > 0 && Number.isInteger(parsed) ? parsed : null;
    });
}
