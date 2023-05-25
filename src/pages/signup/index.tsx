'use state'
import { TextField, InputAdornment } from '@mui/material'
import LeftSide from '../../components/Signup/Leftside'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import Navbar from 'components/Navbar'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'
import isEmail from "validator/lib/isEmail";
import { UserContext } from "contexts";
import { useRouter } from "next/router";
import { ResponseType } from "interfaces";
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "libs/types/user";
import { useIdentify } from "utils/identification";

function SignUp() {

  const {
    isLoading,
    sessionSet,
    setIsLoading,
    setSessionSet,
    setCurrentUser,
  }: any = useContext(UserContext);

  const router = useRouter();
  const [identificationString, setIdentificationString] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emaileError, setEmaileError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordeError, setPasswordeError] = useState<boolean>(false);
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [passwordAgainError, setPasswordAgaineError] =
    useState<boolean>(false);
  const [agrement, setAgrement] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  const { t } = useTranslation('signup');


  // Input error function
  const handleError = (value: boolean) => {
    if (value === true) return "border-red-500 border";
  };

  // auth login
  useEffect(() => {
    if (sessionSet) router.push("/dashboard");
  }, [sessionSet]);


  function handleChange(e: any, setItem: Dispatch<SetStateAction<any>>) {
    setEmaileError(false);
    setPasswordeError(false);
    setPasswordAgaineError(false);
    setError("");

    if (setItem === setAgrement) {
      setItem(!agrement);
    } else {
      setItem(e.target.value);
    }
  }

  const sendRegistration: FormEventHandler = async (e: any) => {
    e.preventDefault();

    // Inputs verification
    if (email === "" || email == null || !isEmail(email))
      return setEmaileError(true);
    if (password === "" || password == null) return setPasswordeError(true);
    if (passwordAgain === "" || passwordAgain == null)
      return setPasswordAgaineError(true);
    if (password !== passwordAgain) {
      setPasswordeError(true);
      setPasswordAgaineError(true);
      return;
    }
     // *****************************************************************
     setIsLoading(true);
     const user: User = { identificationString ,firstName,lastName,email,birthDate, password };
 
     const res: ResponseType = await useIdentify(user, "register");
     setIsLoading(false);
 
     if (res.success === false || res.success === undefined) {
       return setError(
         res.data?.message || "Please try again, or reload the page."
       );
     } else {
       setCurrentUser(res.data?.user);
       localStorage.setItem("token", res.data?.token);
       setSessionSet(true);
       router.push("/dashboard");
       setIsLoading(false);
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
        <form onSubmit={sendRegistration} className='max-w-md m-auto h-max  mt-32 top-0 bottom-0 left-0 right-0' >
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
              value={identificationString}
              onChange={(e) => handleChange(e, setIdentificationString)}
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
              value={firstName}
              onChange={(e) => handleChange(e, setFirstName)}
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
              value={lastName}
              onChange={(e) => handleChange(e, setLastName)}
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
              value={birthDate}
              onChange={(e) => handleChange(e, setBirthDate)}
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
              }}
              fullWidth
            />
             <label className='font-medium text-gray-400'>{t('Email')}</label>
             <TextField 
              className={`${handleError(
                emaileError
              )}`}
              type='text'
              size='small'
              margin='dense'
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
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
              value={password}
              onChange={(e) => handleChange(e, setPassword)}   
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
              }}
              fullWidth           
            /> <label className='font-medium text-gray-400'>{t('PasswordAgain')}</label>
            <TextField 
             type='text'
             size='small'
             margin='dense'
             value={passwordAgain}
             onChange={(e) => handleChange(e, setPasswordAgain)}   
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