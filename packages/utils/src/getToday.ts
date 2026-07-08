import { DateTime } from 'luxon';

export default function (): string {
    return DateTime.now().toFormat('yyyy-MM-dd');
}
