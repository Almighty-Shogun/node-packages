import type { DefaultTheme } from 'vitepress'

export const packages: DefaultTheme.SidebarItem[] = [
    {
        text: 'Packages',
        items: [
            { text: 'Overview', link: '/packages' }
        ]
    },
    {
        text: 'Foundations',
        collapsed: false,
        items: [
            { text: 'HTTP Core', link: '/http-core/' },
            { text: 'Prototype Extensions', link: '/prototype-extensions/' },
            { text: 'Utils', link: '/utils/' }
        ]
    },
    {
        text: 'Vue',
        collapsed: false,
        items: [
            { text: 'Common', link: '/common/' }
        ]
    },
    {
        text: 'Runtime integrations',
        collapsed: false,
        items: [
            { text: 'Bun Server', link: '/bun-server/' },
            { text: 'Cloudflare Worker', link: '/cloudflare-worker/' },
            { text: 'WebKit Native Bridge', link: '/webkit-native-bridge/' }
        ]
    }
];
