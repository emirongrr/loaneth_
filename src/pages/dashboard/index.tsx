import ProfileContainer from 'components/Dashboard/ProfileContainer';
import Head from 'next/head';
import PageBody from 'components/Dashboard/PageContainer';
import Navbar from 'components/Navbar';
import { UserContext } from 'contexts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'components/Loader';

function Dashboard() {
  const { t } = useTranslation('dashboard');
  const { isLoading, sessionSet, currentUser }: any = useContext(UserContext);
  const router = useRouter();

  if (isLoading) return <Loader />;

  if (!sessionSet) return router.push('/login').then(router.reload);

  return (
    <div className="min-h-screen flex flex-col p-0 m-0  dark:bg-[#16161a] ">
      <Head>
        <meta name="description" content={'siteDescription'} />
        <title>{'siteTitle'}</title>
      </Head>
      <Navbar />

      <div className="relative flex flex-1 flex-shrink-0 mt-24">
        <div className="pl-20 pr-20 w-full pb-20 flex flex-col flex-1">
          <div className="grid gap-0 grid-cols-auto p-0 m-0 box-border">
            <ProfileContainer currentUser={currentUser} />
            <PageBody currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'dashboard'])),
    },
  };
}

export default Dashboard;
