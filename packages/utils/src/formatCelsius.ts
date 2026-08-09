import { CELSIUS } from './constants';

export default function (temperature: number): string {
    return Math.round(temperature).toString() + ' ' + CELSIUS;
}
