import type { DefaultTheme } from 'vitepress'

export const vueUtils: DefaultTheme.SidebarItem[] = [
    {
        text: 'Vue Utils',
        items: [
            { text: 'Introduction', link: '/vue-utils/' },
            { text: 'Installation', link: '/vue-utils/installation' }
        ]
    },
    {
        text: 'Composables',
        collapsed: false,
        items: [
            { text: 'useDarkTheme', link: '/vue-utils/composables/useDarkTheme' },
            { text: 'useDataTable', link: '/vue-utils/composables/useDataTable' },
            { text: 'useForm', link: '/vue-utils/composables/useForm' },
            { text: 'useInterval', link: '/vue-utils/composables/useInterval' },
            { text: 'useLoaded', link: '/vue-utils/composables/useLoaded' },
            { text: 'useOpen', link: '/vue-utils/composables/useOpen' },
            { text: 'usePageHeader', link: '/vue-utils/composables/usePageHeader' },
            { text: 'usePagination', link: '/vue-utils/composables/usePagination' },
            { text: 'useRouteParam', link: '/vue-utils/composables/useRouteParam' },
            { text: 'useWebsiteLocale', link: '/vue-utils/composables/useWebsiteLocale' }
        ]
    },
    {
        text: 'Router',
        collapsed: false,
        items: [
            { text: 'containsRoutePrefix', link: '/vue-utils/router/containsRoutePrefix' },
            { text: 'getCurrentRouteName', link: '/vue-utils/router/getCurrentRouteName' },
            { text: 'hasCurrentRoute', link: '/vue-utils/router/hasCurrentRoute' },
            { text: 'isCurrentRoute', link: '/vue-utils/router/isCurrentRoute' }
        ]
    },
    {
        text: 'Refs',
        collapsed: false,
        items: [
            { text: 'localStorageRef', link: '/vue-utils/refs/localStorageRef' },
            { text: 'requiredRef', link: '/vue-utils/refs/requiredRef' }
        ]
    },
    {
        text: 'i18n',
        collapsed: false,
        items: [
            { text: 'registerI18n', link: '/vue-utils/i18n/registerI18n' },
            { text: 'clearRegisteredI18n', link: '/vue-utils/i18n/clearRegisteredI18n' },
            { text: 'translate', link: '/vue-utils/i18n/translate' },
            { text: 'translationExists', link: '/vue-utils/i18n/translationExists' }
        ]
    }
]
