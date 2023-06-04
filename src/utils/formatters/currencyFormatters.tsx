export default function FormatCurrency(value, currency) {
  let currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return currencyFormatter.format(value);
}

export function GetFormatter(currency) {
  if (!currency) {
    currency = 'TRY';
  }
  const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return formatter;
}
