import formatNumber from './formatNumber';

export default function (value: number, decimals: number = 2): string {
    return formatNumber(value, decimals, 'nl');
}
