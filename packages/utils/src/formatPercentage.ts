import getCorrectLocale from './internal/getCorrectLocale';

export default function (value: number, locale?: string): string {
    const localization = getCorrectLocale(locale);

    return new Intl.NumberFormat(localization, {
        style: 'percent',
        maximumFractionDigits: 1,
        minimumFractionDigits: 0
    }).format(value);
}
