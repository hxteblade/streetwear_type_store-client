import React, { ReactNode, forwardRef, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../hook/UserHook";
import { logout } from "../../store/slice/userSlice";
import { clickLogin } from "../../store/slice/modalSlice";
import { login, registration } from "../../store/slice/userSlice";
import { Alert, Container, createTheme, Snackbar, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import ButtonAuthForm from "../../components/UI/Button/ButtonAuthForm";
import InputAuthForm from "../../components/UI/Input/InputAuthForm";
import cl from './Auth.module.scss';

interface Props {
  children: ReactNode
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#fff'
    }
  },
});


const Auth = forwardRef<HTMLDivElement, Props>((props, ref) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');
  const [trySignIn, setTrySignIn] = useState(false);
  const [clickOut,setClickOut] = useState(false);
  const store = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handler = (event : React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const closeModal = () => {
    dispatch(clickLogin());
  };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newVariant: string,
  ) => {
    setVariant(newVariant);    
  };

  const clickHandler = () => {
    setTrySignIn(true);
    if(variant==='login'){
      dispatch(login({email, password}));
      return;
    } 
    dispatch(registration({email, password}));
  };
  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setTrySignIn(false);
  }
  
  const handleCloseOut = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setClickOut(false);
  }

  const handleClickOut = () => {
    dispatch(logout())
    setClickOut(true);
  };

  const changeLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

    return (
    <div className={cl.shadow} onClick={closeModal} ref={ref} tabIndex={-1} >
            {props.children}
      <div className={cl.image} onClick={handler}>
        <div className={cl.imageForm}>
          <ThemeProvider theme={theme}>
            {store.auth
              ? <Container className={cl.imageFormUser}>
                  <Typography className={cl.imageFormUserName} variant="body2">user: {store.nameUser}</Typography>
                  <button className={cl.imageFormUserExitButton} onClick={handleClickOut}>logout</button>
                </Container>
              : <></>
            }
            <ToggleButtonGroup
            color="primary"
            value={variant}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            >
              <ToggleButton className={cl.imageFormToggleButton} value='registration'>sign up</ToggleButton>
              <ToggleButton className={cl.imageFormToggleButton} value='login'>Sign In</ToggleButton>
            </ToggleButtonGroup>
            <InputAuthForm label="Email" handler={changeLoginHandler} type="text" value={email}></InputAuthForm>
            <InputAuthForm label="Password" handler={changePasswordHandler} type="password" value={password}></InputAuthForm>
            <ButtonAuthForm handler={clickHandler}>{variant}</ButtonAuthForm>
            <Snackbar open={trySignIn} autoHideDuration={1500} onClose={handleClose}>
                      {store.error
                        ? <Alert variant="filled" onClose={handleClose} severity="error">{store.error}</Alert>
                        : <Alert variant="filled" onClose={handleClose} severity="success">Succes</Alert>       
                      }
            </Snackbar>
            <Snackbar open={clickOut} autoHideDuration={1500} onClose={handleCloseOut}>
                <Alert variant="filled" onClose={handleCloseOut} severity="warning">You are logged out of your account: {store.nameUser}</Alert>
            </Snackbar>
          </ThemeProvider>
        </div>
      </div>
    </div>
    );
});

export default Auth;
