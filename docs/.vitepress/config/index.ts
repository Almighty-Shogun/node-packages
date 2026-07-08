import { resolve } from 'node:path'
import { sidebar, nav } from './menu'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

const packagePath = resolve(fileURLToPath(new URL('.', import.meta.url)), '../../..');

const alias = {
    '@almighty-shogun/prototype-extensions': resolve(packagePath, 'packages/prototype-extensions/src/index.ts'),
    '@almighty-shogun/utils': resolve(packagePath, 'packages/utils/src/index.ts'),
    '@almighty-shogun/common': resolve(packagePath, 'packages/common/src/index.ts'),
    '@almighty-shogun/webkit-native-bridge': resolve(packagePath, 'packages/webkit-native-bridge/src/index.ts'),
    '@almighty-shogun/bun-server': resolve(packagePath, 'packages/bun-server/src/index.ts')
};

export default defineConfig({
    title: 'Node Packages',
    titleTemplate: ':title — Node Packages',
    description: 'Documentation for all the node/bun packages in the @almighty-shogun monorepo.',
    cleanUrls: true,
    lastUpdated: true,
    sitemap: {
        hostname: 'https://node-packages.shogun.ms'
    },
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        ['link', { rel: 'stylesheet', href: 'https://font.shogun.ms/css?family=inter-variable|jetbrains-mono' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://node-packages.shogun.ms/' }]
    ],
    markdown: {
        config(md) {
            md.use(groupIconMdPlugin)
        }
    },
    vite: {
        resolve: {
            alias
        },
        plugins: [
            groupIconVitePlugin() as any
        ]
    },
    themeConfig: {
        logo: '/logo.svg',
        nav,
        sidebar,
        search: {
            provider: 'local'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Almighty-Shogun/node-packages' },
            { icon: 'discord', link: 'https://discord.gg/QJKU4kdyep' }
        ],
        footer: {
            message: 'All packages are released under the <a href="https://github.com/Almighty-Shogun/node-packages/blob/main/LICENSE">MIT</a> License.',
            copyright: 'Copyright © 2025—present <a href="https://github.com/Almighty-Shogun">Almighty Shogun</a>'
        },
        editLink: {
            pattern: 'https://github.com/Almighty-Shogun/node-packages/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        }
    }
})
