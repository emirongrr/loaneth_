'use state'

import Navbar from 'components/Navbar'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'

function Dashboard() {
    const { t } = useTranslation('dashboard');
  
    return (
      <div className='grid grid-cols-2'>
  
        <Head>
          <meta name="description" content={t('siteDescription')} />
          <title>{t('siteTitle')}</title>
        </Head>
  
      <Navbar/>
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