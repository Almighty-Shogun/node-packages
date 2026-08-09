import type { ParsedHotKey } from './types';
import { isHtmlElement, type Nullable } from '@almighty-shogun/utils';

export const hotKeyAliasMap: Record<string, string> = {
    ctrl: 'control',
    command: 'meta',
    cmd: 'meta',
    super: 'meta',
    win: 'meta',
    windows: 'meta',
    option: 'alt',
    opt: 'alt',
    esc: 'escape',
    return: 'enter',
    del: 'delete',
    up: 'arrowup',
    down: 'arrowdown',
    left: 'arrowleft',
    right: 'arrowright',
    space: ' ',
    spacebar: ' ',
    plus: '+',
};

export function parseHotKey(value: string): ParsedHotKey {
    const keys = value
        .split('+')
        .map(normalizeKey);

    return {
        key: keys.find(key => !['control', 'alt', 'shift', 'meta', 'mod'].includes(key)) ?? '',
        ctrl: keys.includes('control'),
        alt: keys.includes('alt'),
        shift: keys.includes('shift'),
        meta: keys.includes('meta'),
        mod: keys.includes('mod')
    };
}

export function matchesHotKey(event: KeyboardEvent, hotKey: ParsedHotKey): boolean {
    const apple = isOnApplePlatform();

    const meta = hotKey.meta || (hotKey.mod && apple);
    const ctrl = hotKey.ctrl || (hotKey.mod && !apple);

    const key = normalizeKey(event.key);

    const ignoreShift = !hotKey.shift && hotKey.key.length === 1 && !/^[a-z]$/.test(hotKey.key);

    return key === hotKey.key
        && event.ctrlKey === ctrl
        && event.altKey === hotKey.alt
        && event.metaKey === meta
        && (ignoreShift || event.shiftKey === hotKey.shift);
}

function normalizeKey(value: string): string {
    const key = value.trim().toLowerCase();

    return hotKeyAliasMap[key] ?? key;
}

export function isEditable(target: Nullable<EventTarget>): boolean {
    if (!isHtmlElement(target)) {
        return false;
    }

    return target.tagName === 'INPUT'
        || target.tagName === 'TEXTAREA'
        || target.tagName === 'SELECT'
        || target.isContentEditable;
}

export function isOnApplePlatform(): boolean {
    if (typeof navigator === 'undefined') {
        return false;
    }

    return /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);
}
