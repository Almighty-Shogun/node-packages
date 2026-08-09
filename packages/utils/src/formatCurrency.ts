import type { Undefinable } from './types';
import getCorrectLocale from './internal/getCorrectLocale';

export default function (value: number, currency?: Undefinable<string>, locale?: Undefinable<string>): string {
    const localization = getCorrectLocale(locale);

    return new Intl.NumberFormat(localization, {
        style: 'currency',
        currency: currency ?? 'EUR',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    }).format(value);
}
