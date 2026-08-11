import { resolveQueryList } from '../internal';
import MissingParameterError from '../errors/MissingParameterError';

export default function (request: Request, name: string, fallback?: string[]): string[] {
    const values = resolveQueryList(request, name);

    if (values.length > 0) {
        return values;
    }

    if (fallback !== undefined) {
        return fallback;
    }

    throw new MissingParameterError(name);
}
