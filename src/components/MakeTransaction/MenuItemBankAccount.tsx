import Typography from 'components/UI/Typography';
import FormatCurrency from 'utils/formatters/currencyFormatters';

export default function (props) {
  const { accountNumber, iban, currency } = props;
  const balance = FormatCurrency(props.balance, currency);
  return (
    <div className="w-full h-full bg-transparent  flex flex-col">
      <div className="flex">
        <Typography variant="p">{accountNumber}</Typography>
      </div>
      <div className="flex">
        <Typography variant="p">{printFormat(iban, ' ')}</Typography>
      </div>
      <div className="flex">
        <Typography variant="p">{balance}</Typography>
      </div>
    </div>
  );
}

function electronicFormat(iban) {
  var NON_ALPHANUM = /[^a-zA-Z0-9]/g;
  return iban.replace(NON_ALPHANUM, '').toUpperCase();
}

function printFormat(iban, separator) {
  if (typeof separator == 'undefined') {
    separator = ' ';
  }
  var EVERY_FOUR_CHARS = /(.{4})(?!$)/g;
  return electronicFormat(iban).replace(EVERY_FOUR_CHARS, '$1' + separator);
}
