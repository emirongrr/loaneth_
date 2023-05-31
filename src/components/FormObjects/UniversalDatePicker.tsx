import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers'
import { useRouter } from 'next/router';
export default function UniversalDatePicker(props){
    const router = useRouter()
    return(
        <div className='w-full'>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={router?.locale}>
                <DatePicker 
                label={props.label}
                className='w-full'
                onChange={ props.onChange }
                format={props.format}
                />
            </LocalizationProvider>
        </div>
    )
}