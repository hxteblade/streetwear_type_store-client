import React, { ReactNode, forwardRef, useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../../hook/UserHook";
import { SelectChangeEvent, Alert, Container, createTheme, FormControl, InputLabel, MenuItem, Select, Snackbar, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import ButtonAuthForm from "../../Button/ButtonAuthForm";
import InputAuthForm from "../../Input/InputAuthForm";
import cl from './TypeModal.module.scss';
import { clickType } from "../../../../store/slice/modalSlice";
import { createType, getAllTypes, removeType } from "../../../../store/slice/typeSlice";

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


const TypeModal = forwardRef<HTMLDivElement, Props>((props, ref) => {

  const [id,setId] = useState<null | number>(null);
  const [type,setType] =  useState<string>('');
  const [variant,setVariant] = useState<string>('remove');
  const [errorInput,setErrorInput] = useState<boolean>(false);
  const [errorSelect,setErrorSelect] = useState<boolean>(false);
  const [tryChange,setTryChange] = useState<boolean>(false);
  const typeStore = useAppSelector(state => state.type.types);
  const changes = useAppSelector(state => state.type.changes);
  const error = useAppSelector(state => state.type.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTypes());
  }, [changes, dispatch]);

  const closeModalType = () => {
    dispatch(clickType());
  }

  const handler = (event : React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newVariant: string,
  ) => {
    setVariant(newVariant);    
  };

  const clickHandler = () => {
    if(variant==='remove'){
      if (id) {
        dispatch(removeType(id));
        setErrorSelect(false);
        setTryChange(true);
        setId(null);
      }
      else setErrorSelect(true);
      return;
    } 
    if (type !== '') {
      dispatch(createType(type));
      setTryChange(true);
      setType('');
      setErrorInput(false);
    }
    else {
      setErrorInput(true);
    }
  };
  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setTryChange(false);
  }

  const typeChange = (event: SelectChangeEvent) => {
    setId(Number(event.target.value));
  };

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };


    return (
    <div className={cl.shadow} onClick={closeModalType} ref={ref} tabIndex={-1} >
            {props.children}
      <div className={cl.image} onClick={handler}>
        <div className={cl.imageForm}>
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
            color="primary"
            value={variant}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            >
              <ToggleButton className={cl.imageFormToggleButton} value='create'>create</ToggleButton>
              <ToggleButton className={cl.imageFormToggleButton} value='remove'>remove</ToggleButton>
          </ToggleButtonGroup>
            {variant==='create'
                ? <Container>
                    <InputAuthForm label="name" error={errorInput} handler={changeNameHandler} type="text" value={type}></InputAuthForm>
                  </Container>
                : <FormControl variant="standard" sx={{minWidth: '60%', paddingBottom: '10%'}} error={errorSelect}>
                    <InputLabel style={{color: 'white'}} className={cl.selectLabel} id="simple-select-label">category</InputLabel>
                    <Select style={{color: 'white'}} className={cl.selectLabel}
                      labelId="simple-select-label"
                      id="simple-select"
                      value={String(id)}
                      label="category"
                      onChange={typeChange}
                    >
                      {typeStore?.map((type) => {return <MenuItem key={type.id} className={cl.selectItem} value={type.id}>{type.name}</MenuItem>})}
                    </Select>
                    <Typography color={'#bfdc00'} className={cl.imageFormRemoveWarningText}>Warning, all items from this type will be deleted</Typography>
                  </FormControl>
            }
          <ButtonAuthForm handler={clickHandler}>perform</ButtonAuthForm>
          <Snackbar open={tryChange} autoHideDuration={1500} onClose={handleClose}>
                    {error
                      ? <Alert variant="filled" onClose={handleClose} severity="error">{error}</Alert>
                      : <Alert variant="filled" onClose={handleClose} severity="success">{`you are successful ${(variant==='remove') ? 'deleted' : 'created'} type`}</Alert>       
                    }
          </Snackbar>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
});

export default TypeModal;
