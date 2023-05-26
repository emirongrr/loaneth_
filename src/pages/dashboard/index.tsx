import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'
import React, { useContext } from "react";
import { UserContext } from "contexts";
import { Loader } from 'components/Loader';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

function Dashboard() {
    const { t } = useTranslation('dashboard');
    const { isLoading, sessionSet, currentUser }: any = useContext(UserContext);
    const router = useRouter()

    const Logout = (e: any) => {
      e.preventDefault();
      localStorage.removeItem("token");
      router.reload()
    };

    if (isLoading)
    return (
      <>
        <Loader/>
      </>
    );

    if (!sessionSet)
    return ( router.push("/login"));

    return (
      <div>
  
        <Head>
          <meta name="description" content={t('siteDescription')} />
          <title>{t('siteTitle')}</title>
        </Head>

        <Button 
        variant='text'
        onClick={Logout}>text </Button>
      <p className="opacity-50 text-xs mt-1">
                      {currentUser?.identificationString}
                      {currentUser?.firstName}
                      {currentUser?.lastName}
                      {currentUser?.birthDate}
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