import { DateTime } from 'luxon';

export default function (): void {
    let lastTouchEnd = 0;

    document.addEventListener('touchend', (event: TouchEvent) => {
        const now = DateTime.now().toMillis();

        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }

        lastTouchEnd = now;
    });

    document.addEventListener('gesturestart', (event: Event) => {
        event.preventDefault();
    }, { passive: false });

    const meta = document.querySelector('meta[name="viewport"]');

    if (meta) {
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');

        return;
    }

    const newMeta = document.createElement('meta');

    newMeta.setAttribute('name', 'viewport');
    newMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');

    document.head.appendChild(newMeta);
}
