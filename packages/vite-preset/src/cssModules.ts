import type { Plugin } from 'vite';
import className from 'css-class-generator';
import { camelCase, kebabCase } from 'change-case';
import { patchCssModules } from 'vite-css-modules';

type Options = {
    readonly classNames?: 'mangled' | 'camel' | 'kebab';
    readonly generateScopeName?: (name: string, filename: string, css: string) => string;
    readonly prefix?: string;
};

const cssModules = (options: Options = {}): Plugin => {
    const visitedClasses: string[] = [];

    function generateScopeName(name: string): string {
        if (name.startsWith('i__const_')) {
            name = name.substring(9);
            name = name.substring(0, name.length - 2);
        }

        const prefix = options.prefix ?? '';

        if (options.classNames === 'camel') {
            return prefix + camelCase(name);
        }

        if (options.classNames === 'kebab') {
            return prefix + kebabCase(name);
        }

        if (visitedClasses.includes(name)) {
            return prefix + className(visitedClasses.indexOf(name));
        }

        return prefix + className(visitedClasses.push(name) - 1);
    }

    return {
        name: '@almighty-shogun/vite-preset',

        config: () => ({
            css: {
                modules: {
                    generateScopedName: options.generateScopeName ?? generateScopeName
                }
            }
        })
    }
};

export default (options: Options = {}): Plugin[] => {
    return [
        patchCssModules() as unknown as Plugin,
        cssModules(options),
    ];
};
