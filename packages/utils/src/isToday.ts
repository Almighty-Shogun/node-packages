import type { DateTime } from 'luxon'

export default function (dateTime: DateTime, today: DateTime): boolean {
    return dateTime.hasSame(today, "day");
}
