import { resolveQuery } from '../internal';

export default function (request: Request, name: string, fallback?: string): string {
    return resolveQuery(request, name, 'text', fallback, (value) => value);
}
