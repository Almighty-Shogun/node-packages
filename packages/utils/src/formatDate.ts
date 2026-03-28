import type { DateTime } from 'luxon'
import getCorrectLocale from './internal/getCorrectLocale'

export default function (date: DateTime, locale?: string): string {
    const localization = getCorrectLocale(locale);

    return date.setLocale(localization).toLocaleString({
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
