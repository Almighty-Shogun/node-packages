import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { registerRouteScroll } from './routeScroll'
import { FrontmatterDocs, Parameters, Returns } from './components'

import './custom.css'
import 'virtual:group-icons.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app, router }) {
        app.component('FrontmatterDocs', FrontmatterDocs);
        app.component('Parameters', Parameters);
        app.component('Returns', Returns);

        registerRouteScroll(router);
    }
} satisfies Theme;
