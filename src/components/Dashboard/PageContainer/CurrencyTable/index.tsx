import React from 'react';
import { useTranslation } from 'react-i18next';

type CurrencyTableProps = {
  currencies: {
    name: string;
    unit: string;
    value: string;
    type: string;
  }[];
};

const CurrencyTable: React.FC<CurrencyTableProps> = ({ currencies }) => {
  const { t } = useTranslation('dashboard');
  return (
    <div className="flex font-sans justify-center">
      <div className="w-[300px] h-[340px] overflow-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left">
                {t('Currency')}
              </th>
              <th className="py-2 px-4 bg-gray-100 text-right">
                {t('CurrencyValue')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b ">{`${currency.unit}/₺`}</td>
                <td className="py-2 px-4 text-right border-b">
                  {currency.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyTable;
