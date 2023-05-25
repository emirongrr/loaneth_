'use state'
import Navbar from 'components/Navbar'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'
import React, { useContext } from "react";
import { UserContext } from "contexts";

function Dashboard() {
    const { t } = useTranslation('dashboard');
    const { isLoading, sessionSet, currentUser }: any = useContext(UserContext);

  
    return (
      <div className='grid grid-cols-2'>
  
        <Head>
          <meta name="description" content={t('siteDescription')} />
          <title>{t('siteTitle')}</title>
        </Head>
  
      <p className="opacity-50 text-xs mt-1">
                      {currentUser?.email}
                    </p>
      </div>
    )
  }
  
  export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'dashboard'])),
      },
    };
  
  }
  
  export default Dashboard