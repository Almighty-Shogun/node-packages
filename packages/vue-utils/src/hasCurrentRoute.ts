import getCurrentRouteName from './getCurrentRouteName'

export default function (routes: string[]): boolean {
    return routes.includes(getCurrentRouteName());
}
