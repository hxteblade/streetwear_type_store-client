import {FC} from 'react';
import { FormControl, TextField } from "@mui/material";
import cl from './InputAuthForm.module.scss'


interface Props {
    label: string,
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type: string,
    value?: string | FileList | number,
    error?: boolean,
    multiple?: boolean,
    accept?: string,
}

const InputAuthForm : FC<Props> = ({label, handler, type, value, error, multiple, accept}) => {
    return (
        <FormControl color="primary" sx={{minWidth: 300, height: 50, marginTop: 3, width: '100%'}}>
            <TextField
            className={cl.Input}
            variant='standard'
            style={{color: 'white'}}
            label={label}
            error={error}
            value={value}
            onChange={handler}
            type={type}
            color='primary'
            inputProps={{multiple: multiple, accept: accept, style: {color: '#fff'}}}
            InputLabelProps={{style: { color: '#fff' }}}
            />
        </FormControl>
    );
};

export default InputAuthForm;