import { resolveQuery } from '../internal';

const FALSE_VALUES: readonly string[] = ['0', 'false', 'no', 'off'];
const TRUE_VALUES: readonly string[] = ['', '1', 'on', 'true', 'yes'];

export default function (request: Request, name: string, fallback?: boolean): boolean {
    return resolveQuery(request, name, 'a boolean', fallback, (value) => {
        const normalized = value.trim().toLowerCase();

        if (TRUE_VALUES.includes(normalized)) {
            return true;
        }

        return FALSE_VALUES.includes(normalized) ? false : null;
    });
}
