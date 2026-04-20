import getCorrectLocale from './internal/getCorrectLocale'

export default function (locale?: string): void {
    document.documentElement.setAttribute("lang", getCorrectLocale(locale));
}
