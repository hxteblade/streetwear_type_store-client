import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/UserHook";
import { getBasket } from "../../store/slice/basketSlice";
import { Container, Typography } from "@mui/material";
import cl from "./Basket.module.scss";
import ButtonAuthForm from "../../components/UI/Button/ButtonAuthForm";
import BasketItemElement from "../../components/UI/Item/BasketItem/BasketItemElement";


const Backet: FC = () => {

    const dispatch = useAppDispatch();
    const basketItemState = useAppSelector(state => state.basket.basket);
    const triger = useAppSelector(state => state.basket.triger)

    useEffect(() => {
      dispatch(getBasket());
    }, [dispatch, triger]);
    return (
        <Container className={cl.BasketContainer}>
          <Typography className={cl.BasketContainerLogo} variant="h1">basket</Typography>
          <Container className={cl.ShopContainerMain}>
            {basketItemState?.map((elem) => {
              return <BasketItemElement item={elem.item} amount={elem.amount} key={elem.item.id}></BasketItemElement>
            })}
          </Container>
          <ButtonAuthForm background="black" color="white">pay</ButtonAuthForm>
        </Container>
    );
};

export default Backet;
