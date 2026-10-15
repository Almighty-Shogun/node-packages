import type { DefaultTheme } from 'vitepress'

export const vitePreset: DefaultTheme.SidebarItem[] = [
    {
        text: 'Vite Preset',
        items: [
            { text: 'Introduction', link: '/vite-preset/' },
            { text: 'Installation', link: '/vite-preset/installation' }
        ]
    },
    {
        text: 'CSS Modules',
        collapsed: false,
        items: [
            { text: 'cssModules', link: '/vite-preset/cssModules' }
        ]
    }
];
