import { DateTime } from 'luxon';
import type { Undefinable } from './types';

export default function (dateTime: DateTime, today?: Undefinable<DateTime>): boolean {
    return dateTime.hasSame(today ?? DateTime.now(), 'day');
}
