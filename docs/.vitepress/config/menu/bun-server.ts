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
            { text: 'HttpBaseResponse', link: '/bun-server/responses/HttpBaseResponse' },
            { text: 'HttpResponse', link: '/bun-server/responses/HttpResponse' },
            { text: 'JsonHttpResponse', link: '/bun-server/responses/JsonHttpResponse' },
            { text: 'HtmlHttpResponse', link: '/bun-server/responses/HtmlHttpResponse' },
            { text: 'TextHttpResponse', link: '/bun-server/responses/TextHttpResponse' },
            { text: 'FileHttpResponse', link: '/bun-server/responses/FileHttpResponse' },
            { text: 'CreatedHttpResponse', link: '/bun-server/responses/CreatedHttpResponse' },
            { text: 'ForbiddenHttpResponse', link: '/bun-server/responses/ForbiddenHttpResponse' },
            { text: 'NotFoundHttpResponse', link: '/bun-server/responses/NotFoundHttpResponse' },
            { text: 'NoContentHttpResponse', link: '/bun-server/responses/NoContentHttpResponse' },
            { text: 'RedirectHttpResponse', link: '/bun-server/responses/RedirectHttpResponse' }
        ]
    },
]
