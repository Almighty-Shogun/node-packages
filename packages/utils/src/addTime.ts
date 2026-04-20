import { DateTime, type DurationLike } from 'luxon'

export default function (time: DurationLike): DateTime {
    return DateTime.now().plus(time);
}
