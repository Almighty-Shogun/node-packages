import type { DefaultTheme } from 'vitepress';

export const cloudflareWorker: DefaultTheme.SidebarItem[] = [
    {
        text: 'Cloudflare Worker',
        items: [
            { text: 'Introduction', link: '/cloudflare-worker/' },
            { text: 'Installation', link: '/cloudflare-worker/installation' },
            { text: 'Types', link: '/cloudflare-worker/types' }
        ]
    },
    {
        text: 'Routing',
        collapsed: false,
        items: [
            { text: 'compileRoutes', link: '/cloudflare-worker/routing/compileRoutes' },
            { text: 'defineRoute', link: '/cloudflare-worker/routing/defineRoute' }
        ]
    },
    {
        text: 'Scheduling',
        collapsed: false,
        items: [
            { text: 'compileScheduled', link: '/cloudflare-worker/scheduling/compileScheduled' },
            { text: 'defineScheduled', link: '/cloudflare-worker/scheduling/defineScheduled' }
        ]
    },
    {
        text: 'Worker',
        collapsed: false,
        items: [
            { text: 'createWorker', link: '/cloudflare-worker/worker/createWorker' }
        ]
    },
    {
        text: 'Response',
        collapsed: false,
        items: [
            { text: 'HttpResponse', link: '/cloudflare-worker/responses/HttpResponse' }
        ]
    }
];
