import type { DefaultTheme } from 'vitepress'

export const httpCore: DefaultTheme.SidebarItem[] = [
    {
        text: 'HTTP Core',
        items: [
            { text: 'Introduction', link: '/http-core/' },
            { text: 'Installation', link: '/http-core/installation' },
            { text: 'Types', link: '/http-core/types' }
        ]
    },
    {
        text: 'Helpers',
        collapsed: false,
        items: [
            { text: 'Response', link: '/http-core/helpers/response' },
            { text: 'Request', link: '/http-core/helpers/requests' },
            { text: 'Errors', link: '/http-core/helpers/errors' }
        ]
    }
];
