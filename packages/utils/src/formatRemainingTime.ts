import { Duration, type DurationLikeObject } from 'luxon'

export default function (time: DurationLikeObject): string {
    const duration = Duration.fromObject(time)
        .shiftTo("years", "months", "weeks", "days", "hours", "minutes")
        .normalize();

    const years = Math.floor(duration.years);
    const months = Math.floor(duration.months);
    const weeks = Math.floor(duration.weeks);
    const days = Math.floor(duration.days);
    const hours = Math.floor(duration.hours);
    const minutes = Math.max(0, Math.ceil(duration.minutes));

    const parts = [
        years > 0 ? `${years}y` : null,
        months > 0 ? `${months}mo` : null,
        weeks > 0 ? `${weeks}w` : null,
        days > 0 ? `${days}d` : null,
        hours > 0 ? `${hours}h` : null,
        minutes > 0 ? `${minutes}m` : null
    ].filter((part): part is string => part !== null);

    return parts.slice(0, 2).join(" ") || "1m";
}
