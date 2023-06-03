export default function FormatCurrency(value, currency) {
  let currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return currencyFormatter.format(value);
}
