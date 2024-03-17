import {FC, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/UserHook";
import { getAllItems } from "../../../store/slice/itemSlice";
import cl from './ItemList.module.scss';
import { Container } from "@mui/material";
import ItemElement from "../Item/ItemElement";


const ItemList : FC = () => {

  const dispatch = useAppDispatch();
  const stateBrands = useAppSelector(state => state.brand.idCurentBrand);
  const stateTypes = useAppSelector(state => state.type.idCurentType);
  const stateItems = useAppSelector(state => state.item);


  useEffect(() => {
    dispatch(getAllItems({limit: 10, page: 1, typeId: stateTypes, brandId: stateBrands }));
  }, [dispatch, stateBrands, stateTypes]);

  return (
    <Container className={cl.table}>
       {!stateItems.loading
          ? stateItems.items?.map((item) => {
              return <ItemElement key={item.id} item={item}/>
            }) 
          : <></>}
      </Container>
  );
};

export default ItemList;