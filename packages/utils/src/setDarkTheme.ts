export default function (isDark: boolean): void {
    document.documentElement.toggleAttribute("dark", isDark);
}
