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
            { text: 'Base', link: '/bun-server/responses/HttpBaseResponse' },
            { text: 'Factory', link: '/bun-server/responses/HttpResponse' },
            { text: 'JSON', link: '/bun-server/responses/JsonHttpResponse' },
            { text: 'HTML', link: '/bun-server/responses/HtmlHttpResponse' },
            { text: 'Text', link: '/bun-server/responses/TextHttpResponse' },
            { text: 'File', link: '/bun-server/responses/FileHttpResponse' },
            { text: 'Created', link: '/bun-server/responses/CreatedHttpResponse' },
            { text: 'Forbidden', link: '/bun-server/responses/ForbiddenHttpResponse' },
            { text: 'Not Found', link: '/bun-server/responses/NotFoundHttpResponse' },
            { text: 'Method Not Allowed', link: '/bun-server/responses/MethodNotAllowedHttpResponse' },
            { text: 'No Content', link: '/bun-server/responses/NoContentHttpResponse' },
            { text: 'Redirect', link: '/bun-server/responses/RedirectHttpResponse' }
        ]
    },
]
