import Navbar from 'components/Navbar';
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'

const Home: NextPage = () => {
    const { t } = useTranslation('login');
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-100">

       <Head>
        <meta name="description" content={t('siteDescription')} />
        <title>{t('siteTitle')}</title>
      </Head>

      <Navbar/>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
        <div className='w-3/5 p-5'>
          <div className='text-left font-bold'>
              <span className='text-primary'>BANK OF PEOPLE</span>
             </div>
             <div className='py-10'>
              <h2 className='text-3xl font-bold text-green-700 mb-2'>{t('SignIn')}</h2>
              <div className='border-2  border-green-700 w-10 inline-block  mb-2'></div>
              <div className='flex flex-col items-center'>
                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                  <input  type="email" name="email" placeholder='Email' className='bg-gray-100 outline-none flex-1'/>
                </div>
                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                  <input  type="password" name="password" placeholder='Password' className='bg-gray-100 outline-none flex-1'/>
                </div>
                <div className='flex w-64 mb-5 justify-between'>
                  <label className='flex items-center text-xs'>
                    <input type="checkbox" name="remember" className='mr-1'/>
                    {t('Remember')}
                  </label>
                  <a href='#' className='text-xs'>Forgot Password?</a>
                </div>
                <a href='#' className=' border-2 border-green-700 rounded-full px-12 py-2 inline-block font-semibold text-green-700 hover:bg-green-700 hover:text-white'>
             Sign In</a>
              </div>
             </div>
        </div>
         <div className='w-2/3 bg-green-700  text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
           <h2 className='text-3xl font-bold mb-2'> Hello,Friends </h2>
           <div className='border-2  border-white w-10 inline-block  mb-2'></div>
           <p className='mb-10'> Fill up personal information and start journey with us.</p>
           <a href='#' className=' border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-700'>
             Sign Up</a>
          </div>
       </div> 
        
      </main>

    
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

