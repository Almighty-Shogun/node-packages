import type { DefaultTheme } from 'vitepress'

export const prototypeExtensions: DefaultTheme.SidebarItem[] = [
    {
        text: 'Prototype Extensions',
        items: [
            { text: 'Introduction', link: '/prototype-extensions/' },
            { text: 'Installation', link: '/prototype-extensions/installation' }
        ]
    },
    {
        text: 'Array',
        collapsed: false,
        items: [
            { text: 'first', link: '/prototype-extensions/array/first' },
            { text: 'last', link: '/prototype-extensions/array/last' },
            { text: 'delete', link: '/prototype-extensions/array/delete' },
            { text: 'removeDuplicates', link: '/prototype-extensions/array/removeDuplicates' },
            { text: 'addOrRemove', link: '/prototype-extensions/array/addOrRemove' },
            { text: 'isEmpty', link: '/prototype-extensions/array/isEmpty' }
        ]
    },
    {
        text: 'String',
        collapsed: false,
        items: [
            { text: 'toSlug', link: '/prototype-extensions/string/toSlug' },
            { text: 'append', link: '/prototype-extensions/string/append' },
            { text: 'limit', link: '/prototype-extensions/string/limit' },
            { text: 'toNumber', link: '/prototype-extensions/string/toNumber' },
            { text: 'isEmpty', link: '/prototype-extensions/string/isEmpty' },
            { text: 'equals', link: '/prototype-extensions/string/equals' }
        ]
    },
    {
        text: 'Number',
        collapsed: false,
        items: [
            { text: 'add', link: '/prototype-extensions/number/add' },
            { text: 'subtract', link: '/prototype-extensions/number/subtract' },
            { text: 'multiply', link: '/prototype-extensions/number/multiply' },
            { text: 'divide', link: '/prototype-extensions/number/divide' },
            { text: 'equals', link: '/prototype-extensions/number/equals' },
            { text: 'isInRange', link: '/prototype-extensions/number/isInRange' },
            { text: 'isEven', link: '/prototype-extensions/number/isEven' },
            { text: 'isLowerThan', link: '/prototype-extensions/number/isLowerThan' },
            { text: 'isGreaterThan', link: '/prototype-extensions/number/isGreaterThan' }
        ]
    }
]
