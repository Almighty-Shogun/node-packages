import { useRoute } from 'vue-router'

export default function (): string {
    const route = useRoute();

    return route?.name?.toString() ?? "";
}
