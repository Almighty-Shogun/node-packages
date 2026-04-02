import getCurrentRouteName from './getCurrentRouteName'

export default function (prefix: string): boolean {
    return getCurrentRouteName().startsWith(prefix);
}
