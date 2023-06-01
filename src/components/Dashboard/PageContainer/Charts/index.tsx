'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

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
  }
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function Chart() {
  return (
    <>
      <AreaChart
        data={data}
        categories={['Balances']}
        showGridLines={false}
        showXAxis={false}
        index="Month"
        colors={['green']}
        valueFormatter={valueFormatter}
      />
      </>
  );
}