export default async function (value: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(value);

        return true;
    } catch {
        return false;
    }
}
