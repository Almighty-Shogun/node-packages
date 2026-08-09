export default function (): boolean {
    return globalThis.window?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}
