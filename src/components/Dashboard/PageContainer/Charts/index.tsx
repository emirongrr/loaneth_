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
  Text,
  ComposedChart,
  Label,
  ReferenceArea,
  ReferenceLine,
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

  const dateFormatter = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short', day: 'numeric' });
    return formattedDate;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
          <p className="label">{`${label} : ${payload[0].value}`}</p>
      );
    }
  
    return null;
  };
  
  
  
  return (
    <div className="relative">
    <div className="b-[4px] text-xs font-medium dark:text-white leading-normal ">NetWorth</div>
    <div className="mb-[4px] text-2xl dark:text-white leading-normal">123213</div>
    <div className="mb-[12px] text-base text-red dark:text-white">-5.08%</div>

      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={snapshots}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00c087" stopOpacity={0.8} />
              <stop offset="90%" stopColor="#00c087" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip />
          <Line
            isAnimationActive={false}
            strokeLinejoin='round'
            dataKey="totalAssetValue"
            stroke="#00c087"
            strokeWidth={1}
            dot={false}
          />
          <Area
            dataKey="totalAssetValue"
            type="linear"
            strokeLinejoin='round'
            strokeWidth={0}
            fill="url(#gradient)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
  
}
