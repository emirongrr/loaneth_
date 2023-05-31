import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers'
export default function UniversalDatePicker(props){
    return(
        <div className='w-full'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                label={props.label}
                className='w-full'
                />
            </LocalizationProvider>
        </div>
    )
}