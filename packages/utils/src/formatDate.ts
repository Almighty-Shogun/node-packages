import type { DateTime } from 'luxon';
import type { Undefinable } from './types';
import getCorrectLocale from './internal/getCorrectLocale';

export default function (date: DateTime, locale?: Undefinable<string>): string {
    const localization = getCorrectLocale(locale);

    return date.setLocale(localization).toLocaleString({
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
