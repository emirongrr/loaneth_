import ProfileContainer from "components/Dashboard/ProfileContainer";
import Head from 'next/head'
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import PageBody from "components/Dashboard/PageContainer";

export default function Dashboard() {

  return (
    <div className="min-h-screen flex flex-col p-0 m-0 bg-[linear-gradient(to_right,#1E313B,#020617)] ">

    <Head>
      <meta name="description" content={('siteDescription')} />
      <title>{('siteTitle')}</title>
    </Head>
      
      <div className="relative flex flex-1 flex-shrink-0 mt-3 ">
        <div className="pl-20 w-full pb-20 flex flex-col flex-1">
          <div className="sidebar_component"></div>
          <div className="grid gap-0 grid-cols-auto p-0 m-0 box-border">
            <ProfileContainer/>
            <PageBody/>
          </div>
        </div>
        </div>


      
    </div>
  );
}