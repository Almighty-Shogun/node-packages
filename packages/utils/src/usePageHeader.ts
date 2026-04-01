import { ref } from 'vue'
import type { FluxIconName } from '@flux-ui/types'

type HeaderData = {
    title: string;
    icon: FluxIconName;
    page?: string;
};

const pageIcon = ref<FluxIconName>("grid-2");
const pageTitle = ref<string>("Dashboard");

export default function (config?: HeaderData) {
    if (config) {
        pageIcon.value = config.icon
        pageTitle.value = config.title

        document.title = config.page ?? document.title;
    }

    return {
        pageIcon,
        pageTitle
    };
}
