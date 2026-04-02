import getVueInstance from './getVueInstance'

export default function (): string {
    const { route } = getVueInstance();

    return route?.name?.toString() ?? "";
}
