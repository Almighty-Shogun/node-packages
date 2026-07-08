export default function (element?: HTMLElement): void {
    (element ?? window).scrollTo({ top: 0, behavior: 'smooth' });
}
