import type { DateTime } from 'luxon';
import type { Undefinable } from './types';
import getCorrectLocale from './internal/getCorrectLocale';

export default function (date: DateTime, isLong: boolean = true, locale?: Undefinable<string>): string {
    const localization = getCorrectLocale(locale);

    return date.setLocale(localization).toLocaleString({
        month: isLong ? 'long' : 'short'
    });
}
