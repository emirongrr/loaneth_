'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';
import { useTranslation } from 'react-i18next';
import { GetFormatter } from 'utils/formatters/currencyFormatters';

const data = [
  {
    Month: 'Jan 21',
    Balances: 2890,
  },
  {
    Month: 'Feb 21',
    Balances: 1890,
  },
  {
    Month: 'Jan 22',
    Balances: 3890,
  },
];

const valueFormatter = (number: number) =>
  `${GetFormatter('TRY').format(number).toString()}`;

export default function Chart() {
  const { t } = useTranslation('dashboard');
  return (
    <>
      <AreaChart
        data={data}
        categories={[t('Assets')]}
        showGridLines={false}
        showXAxis={false}
        index=""
        colors={['green']}
        valueFormatter={valueFormatter}
      />
    </>
  );
}
