import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/UserHook";
import { addInBasket } from "../../store/slice/basketSlice";
import { Alert, Container, createTheme, Snackbar, ThemeProvider } from "@mui/material";
import ButtonAuthForm from "../../components/UI/Button/ButtonAuthForm";
import cl from './ItemPage.module.scss';
import { clickLogin } from "../../store/slice/modalSlice";
import backButton from "../../img/backButton.png";
import { useNavigate } from "react-router-dom";
import { getOneItems } from "../../store/slice/itemSlice";
import ItemPageInfo from "./ItemPageInfo/ItemPageInfo";


const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#ffffff'
    },
  },
  
});


const ItemPage: FC = () => {

  const store = useAppSelector(state => state.item.curentItem);
  const auth = useAppSelector(state => state.user.auth);
  const result = useAppSelector(state => state.basket);
  const [click,setClick] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const id = localStorage.getItem('curentItemId');
    if (id) {
      dispatch(getOneItems(Number(id))); 
    }
  }, [dispatch]);

  const redirectHandler = () => {
    dispatch(clickLogin());
  };

  const backToShopHandler = () => {
    navigate('/main');
  }

  const handleClose = (event?: Event |React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setClick(false);
  }

  const addItem = () => {
    setClick(true);
    if (store?.id) {
      dispatch(addInBasket(store?.id));
    }
  }

    return (
      <Container className={cl.itemBox}>
        <button onClick={backToShopHandler} className={cl.itemBoxBackButton}><img src={backButton} alt="back" /></button>
        <Container className={cl.itemBoxImage}>
          {store
          ? <img src={`http://localhost:5000/${store?.img}`} alt="" />
          : <></>
          }
        </Container>
        <Container className={cl.itemBoxContent}>
        <ThemeProvider theme={theme}>
          {store
            ? <ItemPageInfo item={store}></ItemPageInfo>
            : <></>
          }
          {auth
            ? <ButtonAuthForm color="black" handler={() => addItem()}> buy </ButtonAuthForm>
            : <ButtonAuthForm color="black" handler={redirectHandler}> buy </ButtonAuthForm>
          }
          <Snackbar open={click} autoHideDuration={1500} onClose={handleClose}>
              {result.result
                      ? <Alert variant="filled" onClose={handleClose} severity="success">item successfully added to cart</Alert>
                      : <Alert variant="filled" onClose={handleClose} severity="error">Apologize, there was some error. We are already fixing this</Alert>
              }
          </Snackbar>
          </ThemeProvider>
        </Container>
      </Container>
    );
};

export default ItemPage;