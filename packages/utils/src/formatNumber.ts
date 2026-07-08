import getCorrectLocale from './internal/getCorrectLocale';

export default function (value: number, decimals: number = 2, locale?: string): string {
    const localization = getCorrectLocale(locale);

    return new Intl.NumberFormat(localization, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    }).format(value);
}
