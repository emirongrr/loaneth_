import React from "react";

type CurrencyTableProps = {
  currencies: {
    name: string;
    value: number;
  }[];
};

const CurrencyTable: React.FC<CurrencyTableProps> = ({ currencies }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[300px] h-[340px] overflow-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left">Currency</th>
              <th className="py-2 px-4 bg-gray-100 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{currency.name}</td>
                <td className="py-2 px-4 text-right border-b">{currency.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyTable;
