import getCurrentRouteName from './internal/getCurrentRouteName'

export default function (prefix: string): boolean {
    return getCurrentRouteName().startsWith(prefix);
}
