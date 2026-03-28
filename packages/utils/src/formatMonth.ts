import type { DateTime } from 'luxon'
import getCorrectLocale from './internal/getCorrectLocale'

export default function (date: DateTime, isLong: boolean = true, locale?: string): string {
    const localization = getCorrectLocale(locale);

    return date.setLocale(localization).toLocaleString({
        month: isLong ? "long" : "short",
    });
}
