import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/UserHook";
import { createTheme, List, ListItem, ListItemText, ThemeProvider } from "@mui/material";
import { Item } from "../../../types/typesItem";
import { getAllBrands } from "../../../store/slice/brandSlice";
import { getAllTypes } from "../../../store/slice/typeSlice";

interface IInfo {
  type: string,
  brand: string,
}

interface Props {
    item: Item,
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#ffffff'
    },
  },
  
});


const ItemPageInfo: FC<Props> = (Props) => {

  const { item } = Props;
  const types = useAppSelector(state => state.type.types);
  const brands = useAppSelector(state => state.brand.brands);
  const dispatch = useAppDispatch();
  const [info,setInfo] = useState<IInfo>({type: 'no information', brand: 'no information'});
  
  useEffect(() => {
    if (types && brands) {
        for (const elemTypes of types) {
          if (item?.typeId == elemTypes.id) {
            for (const elemBrands of brands) {
              if (item?.brandId == elemBrands.id) {
                setInfo({type: elemTypes.name, brand: elemBrands.name});
              }
            }
          }
        }
      }
    else {
        dispatch(getAllBrands());
        dispatch(getAllTypes());
    }
  }, [brands, item?.brandId, item?.typeId, types, item, dispatch]);

    return (
        <ThemeProvider theme={theme}>
        <List>
            <ListItem>
              <ListItemText
                primary="brand"
                secondary={info.brand}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="type"
                secondary={info.type}
              />
            </ListItem>
          {item && item.info
            ?
            <>
              {
              item?.info.map((elem) => {
                return (<ListItem>
                <ListItemText
                  primary={elem.title}
                  secondary={elem.description}
                />
              </ListItem>)
              })
              }
            </>
            :
            <></>
          }
          </List>
          </ThemeProvider>
    );
};

export default ItemPageInfo;