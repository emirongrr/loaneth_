import { useState } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import LeftSide from '../../components/Signup/Leftside'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import Navbar from 'components/Navbar'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'


function SignUp() {
  const [password, setPassword] = useState<string>('')
  const { t } = useTranslation('signup');

  return (
    <div className='grid grid-cols-2'>

      <Head>
        <meta name="description" content={t('siteDescription')} />
        <title>{t('siteTitle')}</title>
      </Head>

    <Navbar/>
    <LeftSide/>
    <section className='min-ipad:relative dark:bg-slate-900'>
        <form className='max-w-md m-auto h-max  mt-32 top-0 bottom-0 left-0 right-0' >
          <header className='px-3'>
            <h1 className='text-[28px] text-gray-400  font-bold'>{t('CreateAnAccount')}</h1>
            <p className=' text-gray-400 text-base'>{t('LetsGetStarted')}</p>
          </header>
          <section className='mt-4 px-3'> 
            <label className='font-medium text-gray-400'>{t('TC')}</label>
            <TextField className='border-white'
              type='text'
              size='small'
              margin='dense'
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
              }}
              fullWidth
            />
            <label className='font-medium text-gray-400'>{t('Name')}</label>
            <TextField 
              type='email'
              size='small'
              margin='dense'
              InputProps={{
                endAdornment: <InputAdornment position='end'></InputAdornment>
              }}
              fullWidth
            />
            <label className='font-medium text-gray-400'>{t('Surname')}</label>
             <TextField 
              type='email'
              size='small'
              margin='dense'
              InputProps={{
                endAdornment: <InputAdornment position='end'></InputAdornment>
              }}
              fullWidth
            />            
            <label className='font-medium text-gray-400'>{t('Birth')}</label>
             <TextField 
              type='email'
              size='small'
              margin='dense'
              InputProps={{
                endAdornment: <InputAdornment position='end'></InputAdornment>
              }}
              fullWidth
            />
             <label className='font-medium text-gray-400'>{t('Number')}</label>
             <TextField 
              type='email'
              size='small'
              margin='dense'
              InputProps={{
                endAdornment: <InputAdornment position='end'></InputAdornment>
              }}
              fullWidth
            />                 
            <label className='font-medium text-gray-400'>{t('Email')}</label>
             <TextField 
              type='email'
              size='small'
              margin='dense'
              InputProps={{
                endAdornment: <InputAdornment position='end'></InputAdornment>
              }}
              fullWidth
            />
          </section>
          <section className='px-3 mt-2'>
            <button type='submit' className='mt-2 bg-gray-700 w-full py-[6px] text-lg rounded-md text-gray-400 font-medium'>{t('SignUpButton')}</button>
          </section>
          <div className='mt-5 mb-3 text-center text-sm text-gray-400'>{t('AlreadyHaveAnAccount?')}</div>
        </form>
    </section>
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