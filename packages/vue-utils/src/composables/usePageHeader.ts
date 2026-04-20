import { ref, type Ref } from 'vue'
import type { FluxIconName } from '@flux-ui/types'

type HeaderData = {
    title: string;
    icon: FluxIconName;
    page?: string;
};

const pageTitle = ref<string>("Dashboard");
const pageIcon = ref<FluxIconName>("grid-2");

export default function (config?: HeaderData): UsePageHeader {
    if (config) {
        pageIcon.value = config.icon
        pageTitle.value = config.title

        document.title = config.page ?? document.title;
    }

    return {
        pageIcon,
        pageTitle
    };
};

type UsePageHeader = {
    readonly pageTitle: Ref<string>;
    readonly pageIcon: Ref<FluxIconName>;
};
