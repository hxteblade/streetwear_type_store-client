import {FC, ReactNode} from 'react';
import { Button } from "@mui/material";
import cl from './ButtonAuthForm.module.scss'


interface Props {
    children: ReactNode,
    handler?: () => void,
    background?: string,
    disabled?: boolean,
    color?: string,
    height?: number,
}

const ButtonAuthForm : FC<Props> = ({children, handler, background, disabled, color, height}) => {
    return (
        <Button
            disabled={disabled}
            style={{backgroundColor: background, color: color, height: `${height}%`}} 
            onClick={handler} 
            className={cl.Button} 
            color="primary" 
            sx={{marginTop:2}}
        >
            {children}
        </Button>
    );
};

export default ButtonAuthForm;