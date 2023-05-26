'use strict'
import SignupForm from 'components/Signup/SignupForm';
import SignupDescription from '../../components/Signup/SignupDescription'
import Navbar from 'components/Navbar'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'

function SignUp() {
  const { t } = useTranslation('signup');

  return (
    <div className='grid grid-cols-2'>

      <Head>
        <meta name="description" content={t('siteDescription')} />
        <title>{t('siteTitle')}</title>
      </Head>

    <Navbar/>
    <SignupDescription/>
    <SignupForm/>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signup'])),
    },
  };

}

export default SignUp