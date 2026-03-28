import { DateTime } from 'luxon'

export default function (date: DateTime): boolean {
    return date.toMillis() < DateTime.now().toMillis();
}
