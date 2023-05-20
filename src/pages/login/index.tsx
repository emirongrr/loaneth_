import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'

const Home: NextPage = () => {
    const { t } = useTranslation('login');
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-white-dark dark:bg-slate-900">

       <Head>
        <meta name="description" content={t('siteDescription')} />
        <title>{t('siteTitle')}</title>
      </Head>

      <Navbar/>

      <main className="flex w-full flex-1 flex-col items-center justify-center mt-32 px-20 text-center">
        <div className='bg-indigo-300  dark:bg-slate-950 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
        <div className='w-3/5 p-5'>
          <div className='text-left font-bold'>
              <span className='text-white dark:text-white'>BANK OF PEOPLE</span>
             </div>
             <div className='py-10'>
              <h2 className='text-3xl font-bold text-black dark:text-white mb-2 text-white'>{t('signIn')}</h2>
              <div className='border-2  border-white dark:border-white w-10 inline-block  mb-2'></div>
              <div className='flex flex-col items-center'>
                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                  <input  type="email" name="email" placeholder={t('email')} className='bg-gray-100 outline-none flex-1'/>
                </div>
                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                  <input  type="password" name="password" placeholder={t('password')} className='bg-gray-100 outline-none flex-1'/>
                </div>
                <div className='flex w-64 mb-5 justify-between'>
                  <label className='flex items-center text-xs dark:text-white'>
                    <input type="checkbox" name="Remember" className='mr-1'/>
                    {t('remember')}
                  </label>
                  <a href='#' className='text-xs dark:text-white' >{t("forgotPassword")}</a>
                </div>
                <a href='#' className=' text-white border-2 border-white  rounded-full px-12 py-2 inline-block font-semibold text-black dark:text-white hover:bg-slate-900 hover:text-white'>
             {t('signInButton')}</a>
              </div>
             </div>
        </div>
         <div className='w-2/3 bg-indigo-200 dark:bg-slate-800 text-gray-500 rounded-tr-2xl rounded-br-2xl py-36 px-12'>
           <h2 className='text-3xl font-bold text-white mb-2'>{t('signUpTitle')}</h2>
           <div className='border-2  border-white w-10 inline-block  mb-2'></div>
           <p className='mb-10 text-white '>{t('signUpDesc')}</p>
           <a href='#' className=' border-2 border-white text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-indigo-100 dark:hover:bg-slate-700'>
             {t('signUpButton')}</a>
          </div>
       </div> 
      </main>    
      <Footer/>
    </div>
  )
}


export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'login'])),
      },
    };

}

export default Home

