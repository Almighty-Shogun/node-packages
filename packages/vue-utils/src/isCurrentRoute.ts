import getCurrentRouteName from './internal/getCurrentRouteName'

export default function (route: string): boolean {
    return getCurrentRouteName() === route;
}
