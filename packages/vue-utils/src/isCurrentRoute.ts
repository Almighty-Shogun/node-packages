import getCurrentRouteName from './getCurrentRouteName'

export default function (route: string): boolean {
    return getCurrentRouteName() === route;
}
