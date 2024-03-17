import React, { ReactNode, forwardRef, useState} from "react";
import { useAppDispatch } from "../../../../hook/UserHook";
import { Container, createTheme, ThemeProvider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import cl from './ItemModal.module.scss';
import { clickItemAdmin } from "../../../../store/slice/modalSlice";
import ItemModalCreate from "./ItemModalCreate/ItemModalCreate";

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

const ItemModal = forwardRef<HTMLDivElement, Props>((props, ref) => {

  const [variant,setVariant] = useState<string>('remove');
  const dispatch = useAppDispatch();

  const closeModalBrand = () => {
    dispatch(clickItemAdmin());
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
                ? <ItemModalCreate></ItemModalCreate>
                : <Container></Container>
            }
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
});

export default ItemModal;
