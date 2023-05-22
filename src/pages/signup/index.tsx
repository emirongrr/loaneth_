import { useState } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import LeftSide from '../../components/Signup/Leftside'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import Navbar from 'components/Navbar'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'
import { useRef } from 'react'
import { User } from 'react-feather'
import Router from 'next/router'

function SignUp() {
  const [password, setPassword] = useState<string>('')
  const { t } = useTranslation('signup');

  const identificationStringInputRef = useRef<HTMLInputElement | null>(null);
  const firstNameInputRef = useRef<HTMLInputElement | null>(null);
  const lastNameInputRef =  useRef<HTMLInputElement | null>(null);
  const birthDateInputRef =  useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const signupHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identificationString: identificationStringInputRef.current?.value,
          firstName: firstNameInputRef.current?.value,
          lastName: lastNameInputRef.current?.value,
          email: emailInputRef.current?.value,
          birthDate: birthDateInputRef?.current?.value,
          password: passwordInputRef.current?.value,
        }),
      });
      
      const responseData = await response.json();
      console.log(responseData);
      
      if (response.status === 201) {
        const name = responseData.name;
        const id = responseData.id;
        Router.push("/");
      } else {
        throw new Error(responseData.message || "Something went wrong!");
      }
    } catch (error) {
      //setError(error.response.data.message || error.message);
      alert(error.message)
    }
  };

  return (
    <div className='grid grid-cols-2'>

      <Head>
        <meta name="description" content={t('siteDescription')} />
        <title>{t('siteTitle')}</title>
      </Head>

    <Navbar/>
    <LeftSide/>
    <section className='min-ipad:relative dark:bg-slate-900'>
        <form onSubmit={signupHandler} className='max-w-md m-auto h-max  mt-32 top-0 bottom-0 left-0 right-0' >
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
              inputRef={identificationStringInputRef}
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
              }}
              fullWidth
             
            />
            <label className='font-medium text-gray-400'>{t('firstName')}</label>
            <TextField 
              type='text'
              size='small'
              margin='dense'
              inputRef={firstNameInputRef}
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
              }}
              fullWidth
            />
            <label className='font-medium text-gray-400'>{t('lastname')}</label>
             <TextField 
              type='text'
              size='small'
              margin='dense'
              inputRef={lastNameInputRef}
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
              }}
              fullWidth
            />            
            <label className='font-medium text-gray-400'>{t('BirthDate')}</label>
             <TextField 
              type='text'
              size='small'
              margin='dense'
              inputRef={birthDateInputRef}
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
              }}
              fullWidth
            />
             <label className='font-medium text-gray-400'>{t('Email')}</label>
             <TextField 
              type='text'
              size='small'
              margin='dense'
              inputRef={emailInputRef}
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
              }}
              fullWidth
            />                 
            <label className='font-medium text-gray-400'>{t('Password')}</label>
             <TextField 
              type='text'
              size='small'
              margin='dense'
              inputRef={passwordInputRef}   
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
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