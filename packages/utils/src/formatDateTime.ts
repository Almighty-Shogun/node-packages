import type { DateTime } from 'luxon';
import type { Undefinable } from './types';
import getCorrectLocale from './internal/getCorrectLocale';

export default function (date: DateTime, locale?: Undefinable<string>): string {
    const localization = getCorrectLocale(locale);

    return date.setLocale(localization).toLocaleString({
        day: 'numeric',
        weekday: 'long',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });
}
