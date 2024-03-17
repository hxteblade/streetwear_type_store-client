import React, { ReactNode, forwardRef, useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../../hook/UserHook";
import { SelectChangeEvent, Alert, Container, createTheme, FormControl, InputLabel, MenuItem, Select, Snackbar, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import ButtonAuthForm from "../../Button/ButtonAuthForm";
import InputAuthForm from "../../Input/InputAuthForm";
import cl from './BrandModal.module.scss';
import { clickBrand } from "../../../../store/slice/modalSlice";
import { createBrand, getAllBrands, removeBrand } from "../../../../store/slice/brandSlice";

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


const BrandModal = forwardRef<HTMLDivElement, Props>((props, ref) => {

  const [id,setId] = useState<null | number>(null);
  const [brand,setBrand] =  useState<string>('');
  const [variant,setVariant] = useState<string>('remove');
  const [errorInput,setErrorInput] = useState<boolean>(false);
  const [errorSelect,setErrorSelect] = useState<boolean>(false);
  const [tryChange,setTryChange] = useState<boolean>(false);
  const brandStore = useAppSelector(state => state.brand.brands);
  const changes = useAppSelector(state => state.brand.changes);
  const error = useAppSelector(state => state.type.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBrands());
  }, [changes, dispatch]);

  const closeModalBrand = () => {
    dispatch(clickBrand());
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
        dispatch(removeBrand(id));
        setErrorSelect(false);
        setTryChange(true);
        setId(null);
      }
      else setErrorSelect(true);
      return;
    } 
    if (brand !== '') {
      dispatch(createBrand(brand));
      setTryChange(true);
      setBrand('');
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

  const brandChange = (event: SelectChangeEvent) => {
    setId(Number(event.target.value));
  };

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };


    return (
    <div className={cl.shadow} onClick={closeModalBrand} ref={ref} tabIndex={-1} >
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
                    <InputAuthForm label="name" error={errorInput} handler={changeNameHandler} type="text" value={brand}></InputAuthForm>
                  </Container>
                : <FormControl variant="standard" sx={{minWidth: '60%', paddingBottom: '10%'}} error={errorSelect}>
                    <InputLabel style={{color: 'white'}} className={cl.selectLabel} id="simple-select-label">brand</InputLabel>
                    <Select style={{color: 'white'}} className={cl.selectLabel}
                      labelId="simple-select-label"
                      id="simple-select"
                      value={String(id)}
                      label="category"
                      onChange={brandChange}
                    >
                      {brandStore?.map((brand) => {return <MenuItem key={brand.id} className={cl.selectItem} value={brand.id}>{brand.name}</MenuItem>})}
                    </Select>
                    <Typography color={'#bfdc00'} className={cl.imageFormRemoveWarningText}>Warning, all items from this brand will be deleted</Typography>
                  </FormControl>
            }
          <ButtonAuthForm handler={clickHandler}>perform</ButtonAuthForm>
          <Snackbar open={tryChange} autoHideDuration={1500} onClose={handleClose}>
                    {error
                      ? <Alert variant="filled" onClose={handleClose} severity="error">{error}</Alert>
                      : <Alert variant="filled" onClose={handleClose} severity="success">{`you are successful ${(variant==='remove') ? 'deleted' : 'created'} brand`}</Alert>       
                    }
          </Snackbar>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
});

export default BrandModal;
