import getCurrentRouteName from './internal/getCurrentRouteName'

export default function (routes: string[]): boolean {
    return routes.includes(getCurrentRouteName());
}
