import ProfileContainer from "components/Dashboard/ProfileContainer";
import Head from 'next/head'
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import Chart from './chart';
import { DonutChart } from "@tremor/react";

const CreditCard = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];
const Assets = [
  {
    name: "Altın",
    sales: 9800,
  },
  {
    name: "USD",
    sales: 4567,
  },
  {
    name: "TRY",
    sales: 3908,
  },
  {
    name: "EUR",
    sales: 2400,
  }
];


const data = [
  {
    category: 'CreditCard',
    stat: '10,234',
    data: CreditCard
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];
const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;


const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
  {
    title: 'Sales',
    metric: '$ 12,699',
    metricPrev: '$ 9,456'
  },
  {
    title: 'Profit',
    metric: '$ 40,598',
    metricPrev: '$ 45,564'
  },
  {
    title: 'Customers',
    metric: '1,072',
    metricPrev: '856'
  }
];

export default function Dashboard() {

  return (
    <div className="min-h-screen flex flex-col p-0 m-0 bg-slate-900">

    <Head>
      <meta name="description" content={('siteDescription')} />
      <title>{('siteTitle')}</title>
    </Head>
      
      <div className="relative flex flex-1 flex-shrink-0">
        <div className="pl-20 w-full pb-20 flex flex-col flex-1">
          <div className="sidebar_component"></div>
          <div className="grid gap-0 grid-cols-auto p-0 m-0 box-border">
            <ProfileContainer/>
          </div>
        </div>
        </div>

        <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="gap-6" numColsSm={2} numColsLg={3}>
        {categories.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <Text>{item.title}</Text>
            </Flex>
            <Flex
              className="space-x-3 truncate"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.metric}</Metric>
              <Text className="truncate">from {item.metricPrev}</Text>
            </Flex>
          </Card>
        ))}
      </Grid>

      <Card className="max-w-lg mt-2">
          <Title>Assets</Title>
          <DonutChart
            className="mt-6"
            data={Assets}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>

      <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>
            <BarList
              className="mt-2"
              data={item.data}
              valueFormatter={dataFormatter}
            />
          </Card>
        ))}
      </Grid>
      <Chart />
    </main>
    </div>
  );
}