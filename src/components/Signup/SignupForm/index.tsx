import * as React from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import { TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next';
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
import { UseIdentify } from "utils/identification";
import UniversalDatePicker from 'components/FormObjects/UniversalDatePicker';

export default function SignupForm(){
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
      const [passwordError, setPasswordError] = useState<boolean>(false);
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
        setPasswordError(false);
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
        if (password === "" || password == null) return setPasswordError(true);
        if (passwordAgain === "" || passwordAgain == null)
          return setPasswordAgaineError(true);
        if (password !== passwordAgain) {
          setPasswordError(true);
          setPasswordAgaineError(true);
          return;
        }
         // *****************************************************************
         setIsLoading(true);
         const user: User = { identificationString ,firstName,lastName,email,birthDate, password };
     
         const res: ResponseType = await UseIdentify(user, "register");
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
       return(
        <section className='min-ipad:relative dark:bg-slate-900'>
        <form onSubmit={sendRegistration} className='max-w-md m-auto h-max  mt-32 top-0 bottom-0 left-0 right-0' >
          <header className='px-3'>
            <h1 className='text-[28px] text-gray-400  font-bold'>{t('SignupFormHeader')}</h1>
            <p className=' text-gray-400 text-base'>{t('SignupFormHeaderSubtext')}</p>
          </header>
          <section className='mt-4 px-3'> 
            <TextField className='border-white'
              label={t('IdentificationString')}
              
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
            <TextField 
              label={t('FirstName')}
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
             <TextField 
              label={t('LastName')}
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
            <UniversalDatePicker
            label={t('BirthDate')}
            format="DD/MM/YYYY"
            onChange={(newDate) => {
              setBirthDate(newDate.$d)
            }}
            />
            <div className='border-black'>
              <FormControl variant='filled' sx={ {minWidth:120}} size='small' margin='dense' className='w-3/12 mr-5'>
                <InputLabel id="countrylabel">{t('Country')}</InputLabel>
                <Select 
                  labelId='countrylabel'
                >
                  <MenuItem value="TR">TR</MenuItem>
                </Select>
              </FormControl>
              <TextField
                
                className='mt-4 w-8/12'
                label={t('City')}
                type='text'
                size='small'
                margin='dense'
              >  
              </TextField>
            </div>
             <TextField 
              className={`${handleError(
                emaileError
              )}`}
              label={t('Email')}
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
             <TextField 
              label={t('Password')}
              type='password'
              size='small'
              margin='dense'
              value={password}
              onChange={(e) => handleChange(e, setPassword)}   
              InputProps={{
                endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
              }}
              fullWidth           
            /> 
            <TextField 
             label={t('PasswordAgain')}
             type='password'
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
            <button type='submit' className='mt-2 bg-gray-700 w-full py-[6px] text-lg rounded-md text-gray-400 font-medium'>{t('SignupFormSubmitButton')}</button>
          </section>
          <div className='mt-5 mb-3 text-center text-sm text-gray-400'>{t('AlreadyHaveAnAccount')}</div>
        </form>
    </section>
       )
}