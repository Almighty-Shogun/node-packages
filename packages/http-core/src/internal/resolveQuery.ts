import type { Nullable } from '@almighty-shogun/utils';
import InvalidParameterError from '../errors/InvalidParameterError';
import MissingParameterError from '../errors/MissingParameterError';

export default function <T>(
    request: Request,
    name: string,
    expected: string,
    fallback: T | undefined,
    parse: (value: string) => Nullable<T>
): T {
    const { searchParams } = new URL(request.url);

    const raw = searchParams.get(name);

    if (raw === null) {
        if (fallback !== undefined) {
            return fallback;
        }

        throw new MissingParameterError(name);
    }

    const parsed = parse(raw);

    if (parsed !== null) {
        return parsed;
    }

    if (fallback !== undefined) {
        return fallback;
    }

    throw new InvalidParameterError(name, expected);
}
