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
  Area,
  ComposedChart,
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
      .then((res) => {
        setSnapshots(res?.snapshots);
        console.log(res);
      });
  };
  useEffect(() => {
    getSnapshotsAsync();
  }, []);

  return (
    <ResponsiveContainer>
      <ComposedChart width={580} height={300} data={snapshots}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity={1} />
            <stop offset="50%" stopColor="#A35EF1" stopOpacity={0.7} />
            <stop offset="95%" stopColor="#925DE5" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          strokeLinecap="round"
          type="monotone"
          dataKey="totalAssetValue"
          stroke="#8884d8"
          opacity={0.6}
          strokeWidth={0.9}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="totalAssetValue"
          strokeWidth={0}
          fillOpacity={0.8}
          fill="url(#gradient)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
