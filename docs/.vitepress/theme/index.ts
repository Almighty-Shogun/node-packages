import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { FrontmatterDocs, Parameters, Returns } from './components'

import './custom.css'
import 'virtual:group-icons.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('FrontmatterDocs', FrontmatterDocs);
        app.component('Parameters', Parameters);
        app.component('Returns', Returns);
    }
} satisfies Theme;
