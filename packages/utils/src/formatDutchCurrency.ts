import formatCurrency from './formatCurrency';

export default function (value: number): string {
    return formatCurrency(value, 'EUR', 'nl');
}
