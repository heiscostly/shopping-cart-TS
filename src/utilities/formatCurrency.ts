const CURRENCY_FORMATER = new Intl.NumberFormat(undefined , {
    style: 'currency',
    currency: 'USD',
});
export function formatCurrency(number: number) {
  return CURRENCY_FORMATER.format(number);
}