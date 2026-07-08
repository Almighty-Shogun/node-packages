import formatPercentage from './formatPercentage';

export default function (value: number): string {
    return formatPercentage(value, 'nl');
}
