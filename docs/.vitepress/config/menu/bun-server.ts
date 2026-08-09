import type { DefaultTheme } from 'vitepress'

export const bunServer: DefaultTheme.SidebarItem[] = [
    {
        text: 'Bun Server',
        items: [
            { text: 'Introduction', link: '/bun-server/' },
            { text: 'Installation', link: '/bun-server/installation' },
            { text: 'Types', link: '/bun-server/types' }
        ]
    },
    {
        text: 'Routing',
        collapsed: false,
        items: [
            { text: 'compileRoutes', link: '/bun-server/routing/compileRoutes' },
            { text: 'defineHtmlRoute', link: '/bun-server/routing/defineHtmlRoute' },
            { text: 'defineRoute', link: '/bun-server/routing/defineRoute' }
        ]
    },
    {
        text: 'Server',
        collapsed: false,
        items: [
            { text: 'createServer', link: '/bun-server/server/createServer' }
        ]
    },
    {
        text: 'Responses',
        collapsed: false,
        items: [
            { text: 'HttpBaseResponse', link: '/bun-server/responses/HttpBaseResponse' }
        ]
    }
];
