import type { DefaultTheme } from 'vitepress'

export const common: DefaultTheme.SidebarItem[] = [
    {
        text: 'Common',
        items: [
            { text: 'Introduction', link: '/common/' },
            { text: 'Installation', link: '/common/installation' }
        ]
    },
    {
        text: 'Composables',
        collapsed: false,
        items: [
            { text: 'useDarkTheme', link: '/common/composables/useDarkTheme' },
            { text: 'useDataTable', link: '/common/composables/useDataTable' },
            { text: 'useForm', link: '/common/composables/useForm' },
            { text: 'useInterval', link: '/common/composables/useInterval' },
            { text: 'useLoaded', link: '/common/composables/useLoaded' },
            { text: 'useOpen', link: '/common/composables/useOpen' },
            { text: 'usePageHeader', link: '/common/composables/usePageHeader' },
            { text: 'usePagination', link: '/common/composables/usePagination' },
            { text: 'useRouteParam', link: '/common/composables/useRouteParam' },
            { text: 'useWebsiteLocale', link: '/common/composables/useWebsiteLocale' }
        ]
    },
    {
        text: 'Router',
        collapsed: false,
        items: [
            { text: 'containsRoutePrefix', link: '/common/router/containsRoutePrefix' },
            { text: 'getCurrentRouteName', link: '/common/router/getCurrentRouteName' },
            { text: 'hasCurrentRoute', link: '/common/router/hasCurrentRoute' },
            { text: 'isCurrentRoute', link: '/common/router/isCurrentRoute' }
        ]
    },
    {
        text: 'Refs',
        collapsed: false,
        items: [
            { text: 'localStorageRef', link: '/common/refs/localStorageRef' },
            { text: 'requiredRef', link: '/common/refs/requiredRef' }
        ]
    },
    {
        text: 'i18n',
        collapsed: false,
        items: [
            { text: 'registerI18n', link: '/common/i18n/registerI18n' },
            { text: 'clearRegisteredI18n', link: '/common/i18n/clearRegisteredI18n' },
            { text: 'translate', link: '/common/i18n/translate' },
            { text: 'translationExists', link: '/common/i18n/translationExists' }
        ]
    }
]
