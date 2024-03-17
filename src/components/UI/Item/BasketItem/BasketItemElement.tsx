import {FC, useEffect, useState} from "react";
import cl from './BasketItemElemetn.module.scss';
import { Container, Typography } from "@mui/material";
import { useAppDispatch } from "../../../../hook/UserHook";
import { Item } from "../../../../types/typesItem";
import { addInBasket, deleteAllItemByIdInBasket, deleteOneItemInBasket } from "../../../../store/slice/basketSlice";
import TrashBasket from '../../../../img/trash_basket.png';
import { useNavigate } from "react-router-dom";
import { curentItem } from "../../../../store/slice/itemSlice";

interface Props {
    item: Item,
    amount: number,
}


const BasketItemElement : FC<Props> = ({item, amount}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name,setName] = useState<string>('')
    const [disab,setDisab] = useState<boolean>(false)

    useEffect(() => {
        if(amount<= 1) setDisab(true);
        else setDisab(false);
        let sliced = item.name.slice(0,25);
        if (sliced.length < item.name.length) {
        sliced += '...';
        }
        setName(sliced)
    }, [item, amount]);

    const addItemHandler = (id: number) => {
        dispatch(addInBasket(id));
    };

    const deleteOneItem = (id: number) => {
        dispatch(deleteOneItemInBasket(id));
    };

    const deleteAllItems = (id: number) => {
        dispatch(deleteAllItemByIdInBasket(id));
    };

    const redirectHandler = () => {
        dispatch(curentItem(item.id));
        navigate(`/item/${item.id}`);
    }

    return (
            <Container className={cl.Form}>
                <Container className={cl.FormDescription}>
                    <Typography onClick={redirectHandler} className={cl.FormDescriptionName} variant="h2">{name}</Typography>
                    <Typography variant="h2">{`${item.price} rub`}</Typography>
                </Container>
                <Container className={cl.FormNav}>
                    <Container className={cl.FormNavButton}>
                        <button onClick={() => addItemHandler(item.id)}>+</button>
                        <p>{amount}</p>
                        {disab
                            ? <button disabled>-</button>
                            : <button onClick={() => deleteOneItem(item.id)}>-</button>
                        }
                    </Container>
                    <img onClick={redirectHandler} className={cl.FormImage} src={'http://localhost:5000/' + item.img} alt=""/>
                    <button className={cl.FormTrashBasket} onClick={() => deleteAllItems(item.id)}><img src={TrashBasket}></img></button>
                </Container>
            </Container>
    );
};

export default BasketItemElement;