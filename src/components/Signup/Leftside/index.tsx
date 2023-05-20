import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function LeftSide() {
    const { t } = useTranslation('signup');

    return (
      <section className='bg-[linear-gradient(to_right,#C7D2FE,#6a82fb)] dark:bg-[linear-gradient(to_right,#1E313B,#020617)] relative h-screen max-ipad:hidden'>
        <div className='m-auto h-max max-w-xl px-8 py-[calc(100vh-70%)] rounded-md text-white absolute top-0 bottom-0 left-0 right-0 bg-[rgba(249,249,249,0.24)]'>
          <h1 className='text-6xl font-semibold w-[480px]'>{t('A new paradigm for banks')} <span className='text-black'>{t('deploying.')}.</span></h1>
          <p className='text-lg font-medium mt-6'>{t('Where tradition meets innovation in Banking.')}</p>
          <p className='text-lg font-medium'>{t('Building a bridge to future.')}</p>
        </div>
      </section>
    )
  }
  

  export default LeftSide