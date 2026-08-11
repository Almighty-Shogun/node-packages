import { DateTime } from 'luxon';
import { resolveQuery } from '../internal';

export default function (request: Request, name: string, fallback?: DateTime): DateTime {
    return resolveQuery(request, name, 'an ISO 8601 date', fallback, (value) => {
        const parsed = DateTime.fromISO(value.trim());

        return parsed.isValid ? parsed : null;
    });
}
