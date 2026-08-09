import { ref, type Ref } from 'vue';
import type { Undefinable } from '@almighty-shogun/utils';

type HeaderData<TIcon = string> = {
    title: string;
    icon: TIcon;
    page?: Undefinable<string>;
};

const pageTitle = ref<string>('Dashboard');
const pageIcon = ref<unknown>('grid-2');

export default function <TIcon = string>(config?: Undefinable<HeaderData<TIcon>>): UsePageHeader<TIcon> {
    if (config) {
        pageIcon.value = config.icon;
        pageTitle.value = config.title;

        document.title = config.page ?? document.title;
    }

    return {
        pageIcon: pageIcon as Ref<TIcon>,
        pageTitle
    };
};

type UsePageHeader<TIcon = string> = {
    readonly pageTitle: Ref<string>;
    readonly pageIcon: Ref<TIcon>;
};
