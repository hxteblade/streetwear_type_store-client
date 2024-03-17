import {FC} from "react";
import cl from './Shop.module.scss';
import { Container, Typography } from "@mui/material";
import Info from "../../components/UI/Info/Info";
import ItemList from "../../components/UI/ItemList/ItemList";
import SearchParams from "../../components/UI/searchParams/SearchParams";


const Shop : FC = () => {

    return (
      <Container className={cl.ShopContainer}>
        <Info></Info>
        <Typography className={cl.ShopContainerLogo} variant="h2">shop</Typography>
        <Container className={cl.ShopContainerMain}>
          <SearchParams></SearchParams>
          <ItemList></ItemList>
        </Container>
      </Container>
    );
};

export default Shop;