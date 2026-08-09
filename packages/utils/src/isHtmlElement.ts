export default function (element: unknown): element is HTMLElement {
    if (!globalThis.document) {
        return false;
    }

    return element instanceof HTMLElement;
}
