import { FAHRENHEIT } from './constants';

export default function (temperature: number): string {
    return Math.round(temperature).toString() + ' ' + FAHRENHEIT;
}
