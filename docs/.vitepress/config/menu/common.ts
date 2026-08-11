import type { DefaultTheme } from 'vitepress'

export const common: DefaultTheme.SidebarItem[] = [
    {
        text: 'Common',
        items: [
            { text: 'Introduction', link: '/common/' },
            { text: 'Installation', link: '/common/installation' },
            { text: 'Types', link: '/common/types' }
        ]
    },
    {
        text: 'Composables',
        collapsed: false,
        items: [
            { text: 'useClickOutside', link: '/common/composables/useClickOutside' },
            { text: 'useClipboard', link: '/common/composables/useClipboard' },
            { text: 'useDarkTheme', link: '/common/composables/useDarkTheme' },
            { text: 'useDataTable', link: '/common/composables/useDataTable' },
            { text: 'useEventListener', link: '/common/composables/useEventListener' },
            { text: 'useForm', link: '/common/composables/useForm' },
            { text: 'useHotKey', link: '/common/composables/useHotKey' },
            { text: 'useInterval', link: '/common/composables/useInterval' },
            { text: 'useLoaded', link: '/common/composables/useLoaded' },
            { text: 'useLocalStorage', link: '/common/composables/useLocalStorage' },
            { text: 'useOpen', link: '/common/composables/useOpen' },
            { text: 'usePageHeader', link: '/common/composables/usePageHeader' },
            { text: 'usePagination', link: '/common/composables/usePagination' },
            { text: 'usePersistentRef', link: '/common/composables/usePersistentRef' },
            { text: 'useScrollPosition', link: '/common/composables/useScrollPosition' },
            { text: 'useWebsiteLocale', link: '/common/composables/useWebsiteLocale' }
        ]
    },
    {
        text: 'Middleware',
        collapsed: false,
        items: [
            { text: 'defineMiddleware', link: '/common/middleware/defineMiddleware' },
            { text: 'registerMiddleware', link: '/common/middleware/registerMiddleware' }
        ]
    },
    {
        text: 'Router',
        collapsed: false,
        items: [
            { text: 'useIsRoute', link: '/common/router/useIsRoute' },
            { text: 'useRouteMeta', link: '/common/router/useRouteMeta' },
            { text: 'useRouteName', link: '/common/router/useRouteName' },
            { text: 'useRouteNames', link: '/common/router/useRouteNames' },
            { text: 'useRouteParam', link: '/common/router/useRouteParam' }
        ]
    },
    {
        text: 'Util',
        collapsed: false,
        items: [
            { text: 'componentRef', link: '/common/util/componentRef' },
            { text: 'debouncedRef', link: '/common/util/debouncedRef' },
            { text: 'nullableRef', link: '/common/util/nullableRef' },
            { text: 'requiredRef', link: '/common/util/requiredRef' },
            { text: 'unwrapElement', link: '/common/util/unwrapElement' },
            { text: 'unwrapTarget', link: '/common/util/unwrapTarget' }
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
];
