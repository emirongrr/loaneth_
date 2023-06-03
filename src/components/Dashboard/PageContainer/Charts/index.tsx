'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';
import { useTranslation } from 'react-i18next';
import { GetFormatter } from 'utils/formatters/currencyFormatters';
import { Snapshot } from 'libs/types/snapshot';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import getSnapshots from 'utils/apimiddleware/getSnapshots';

const valueFormatter = (number: number) =>
  `${GetFormatter('TRY').format(number).toString()}`;

export default function Chart() {
  const { t } = useTranslation('dashboard');
  let chartData = [];

  const [snapshots, setSnapshots] = useState<Snapshot[]>();
  const getSnapshotsAsync = () => {
    return getSnapshots(localStorage.getItem('token'))
      .then()
      .then((res) => setSnapshots(res?.snapshots?.snapshots));
  };
  useEffect(() => {
    getSnapshotsAsync();
  }, []);

  return (
    <LineChart width={580} height={300} data={snapshots}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="totalAssetValue"
        stroke={`${2 ? 'green' : 'red'}`}
        activeDot={{ r: 0 }}
      />
    </LineChart>
  );
}
