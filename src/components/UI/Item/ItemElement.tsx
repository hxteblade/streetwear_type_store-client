import {FC} from "react";
import cl from './ItemElement.module.scss';
import { Container, Typography } from "@mui/material";
import { Item } from "../../../types/typesItem";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hook/UserHook";
import { curentItem } from "../../../store/slice/itemSlice";

interface Props {
    item: Item,
    key: number,
}


const ItemElement : FC<Props> = ({item}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const openItemHandler = () => {
        dispatch(curentItem(item.id));
        navigate(`/item/:${item.id}`);     
    };

    return (
            <Container className={cl.Form}>
                <div onClick={openItemHandler}>
                <img className={cl.FromImage} src={'http://localhost:5000/' + item.img} alt=""/>
                <Typography variant="h2">{item.name}</Typography>
                <Typography variant="body1">{item.price}</Typography>
                <div style={{width: '100%', height: 70, cursor: 'auto'}}></div>
                </div>
            </Container>
    );
};

export default ItemElement;