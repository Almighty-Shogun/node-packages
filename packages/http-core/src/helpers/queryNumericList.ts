import { resolveQueryList } from '../internal';
import InvalidParameterError from '../errors/InvalidParameterError';
import MissingParameterError from '../errors/MissingParameterError';

export default function (request: Request, name: string, fallback?: number[]): number[] {
    const values = resolveQueryList(request, name);

    if (values.length === 0) {
        if (fallback !== undefined) {
            return fallback;
        }

        throw new MissingParameterError(name);
    }

    const numbers: number[] = [];

    for (const value of values) {
        const parsed = Number(value);

        if (!Number.isFinite(parsed)) {
            if (fallback !== undefined) {
                return fallback;
            }

            throw new InvalidParameterError(name, 'a list of numbers');
        }

        numbers.push(parsed);
    }

    return numbers;
}
