import {FC, useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/UserHook";
import { getAllBrands, curentBrand } from "../../../store/slice/brandSlice";
import { getAllTypes, curentType } from "../../../store/slice/typeSlice";
import cl from './SearchParams.module.scss';
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";



const SearchParams : FC = () => {
    const dispatch = useAppDispatch();
    const stateTypes = useAppSelector(state => state.type);
    const stateBrands = useAppSelector(state => state.brand);

    const [type,setType] = useState('');
    const [brand,setBrand] = useState('');

  useEffect(() => {
    dispatch(getAllTypes());
    dispatch(getAllBrands());
  }, [dispatch]);

  const brandChange = (event: SelectChangeEvent) => {
    if(event.target.value === undefined){
      setBrand('');
      dispatch(curentBrand(null));
      return
    }
    dispatch(curentBrand(Number(event.target.value)));
    setBrand(String(event.target.value));
  };
  const typeChange = (event: SelectChangeEvent) => {
    if(event.target.value === undefined){
      setType('');
      dispatch(curentType(null));
      return
    }
    dispatch(curentType(Number(event.target.value)));
    setType(String(event.target.value));
  };


  return (
    <Container className={cl.container}>
        {!stateTypes.loading
            ?   <FormControl variant="standard" sx={{minWidth: '60%', paddingBottom: '10%'}}>
                    <InputLabel className={cl.selectLabel} id="simple-select-label">category</InputLabel>
                    <Select className={cl.selectLabel}
                        labelId="simple-select-label"
                        id="simple-select"
                        value={type}
                        label="category"
                        onChange={typeChange}
                    >
                        {stateTypes.types?.map((type) => {return <MenuItem key={type.id} className={cl.selectItem} value={type.id}>{type.name}</MenuItem>})}
                        <MenuItem className={cl.selectItem} value={undefined}>reset</MenuItem>
                    </Select>
                </FormControl>
            :   <></>
        }
        {!stateBrands.loading
            ?   <FormControl variant="standard" sx={{minWidth: '60%'}}>
                    <InputLabel className={cl.selectLabel} id="2simple-select-label">manufacturer</InputLabel>
                    <Select className={cl.selectLabel}
                        labelId="2simple-select-label"
                        id="2simple-select"
                        value={brand}
                        label="manufacturer"
                        onChange={brandChange}
                    >
                        {stateBrands.brands?.map((brand) => {return <MenuItem key={brand.id} className={cl.selectItem} value={brand.id}>{brand.name}</MenuItem>})}
                        <MenuItem className={cl.selectItem} value={undefined}>reset</MenuItem>
                    </Select>
                </FormControl>
            :   <></>
        }

    </Container>
  );
};

export default SearchParams;