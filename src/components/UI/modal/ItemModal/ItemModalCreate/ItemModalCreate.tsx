import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../hook/UserHook";
import { SelectChangeEvent, Container, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import ButtonAuthForm from "../../../Button/ButtonAuthForm";
import InputAuthForm from "../../../Input/InputAuthForm";
import cl from './ItemModalCreate.module.scss';
import { getAllBrands } from "../../../../../store/slice/brandSlice";
import { Info } from "../../../../../types/typesItem";
import { getAllTypes } from "../../../../../store/slice/typeSlice";
import { createItem } from "../../../../../store/slice/itemSlice";
import deleteIcon from "../../../../../img/94dft9po0e945e2ts1e8s9l2jb.png";

type dangerousText = {
    title: string,
    description: string,
    isBadUser: boolean,
}

type formattedText = {
    text: string,
    lengthString: number,
}

const ItemModalCreate: FC = () => {


    const [itemName,setItemName] =  useState<string>('');
    const [itemPrice,setItemPrice] = useState<number>();
    const [selectedBrand,setSelectedBrand] = useState<number | null>(null);
    const [selectedType,setSelectedType] = useState<number | null>(null);
    const [itemPreview,setItemPreview] = useState<Blob | null>(null);
    const [itemPhotos,setItemPhotos] = useState<Blob[] | null>(null);
    const [errorInput,setErrorInput] = useState<boolean>(false);
    const [errorInputEntry,setErrorInputEntry] = useState<boolean>(false);
    const [info,setInfo] = useState<Info[]>([]);
    const [title,setTitle] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const brandState = useAppSelector(state => state.brand.brands);
    const typeState = useAppSelector(state => state.type.types);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!brandState) dispatch(getAllBrands());
        if(!typeState) dispatch(getAllTypes());
    }, [dispatch,brandState,typeState]);

    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
      };
      const changePriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemPrice(Number(e.target.value));
      };
      const changePreviewHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setItemPreview(e.target.files[0]);
        console.log(itemPreview);
      };
      const changePhotoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        if (e.target.files) {
          const arr = e.target.files
          const acc = []
          for (const item of arr) {
            acc.push(item)
          }
          setItemPhotos(acc)
        }
      };
      const brandChange = (event: SelectChangeEvent) => {
        setSelectedBrand(Number(event.target.value));
      };
      const typeChange = (event: SelectChangeEvent) => {
        setSelectedType(Number(event.target.value));
      };
      const addEntry = () => {
        if(!title || !description) {
            setErrorInputEntry(true);
            return;
        }
        setInfo([...info,{title: title,description: description}])
        setTitle('');
        setDescription('');
        setErrorInputEntry(false);
      };
      const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
      };
      const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
      };
      const createHandler = () => {
        if(!itemName || !itemPrice || !itemPreview || !selectedBrand || !selectedType) {
            setErrorInput(true);
            return;
        }
        const item = {
            name: itemName,
            price: String(itemPrice),
            preview: itemPreview,
            brandId: String(selectedBrand),
            typeId: String(selectedType),
            info: info,
            photos: (itemPhotos !== null) ? itemPhotos : undefined,
        }
        dispatch(createItem(item));
        setItemName('');
        setItemPrice(0);
        setItemPreview(null);
        setSelectedBrand(null);
        setSelectedType(null);
        setInfo([]);
        setItemPhotos(null);
        setErrorInput(false);
      };

      const badUser = ({title, description, isBadUser}: dangerousText) => {
        for(let i = 0; (i < title.length); i++) {
            if(title[i] === '<' || title[i] === '>') {
                title = 'you are bad(';
                description = 'dont try can this';
                isBadUser = true
            }
        }
        if (!isBadUser) {
            for(let i = 0; (i < description.length); i++) {
                if(description[i] === '<' || description[i] === '>') {
                    title = 'you are bad(';
                    description = 'dont try can this';
                    isBadUser = true;
                }
            }
        }
        return {title,description,isBadUser}
      }
      const formattedFilter = ({text, lengthString}: formattedText) => {
        if (text.length >= lengthString) {
            for (let i = 15; i < text.length; i+=(lengthString+4)) {
                text = text.slice(0, i) + "<br>" + text.slice(i);
            }
            return text;
        }
        return text;
      }

    return (
        <Container className={cl.Container}>
            <InputAuthForm label="name" error={errorInput} handler={changeNameHandler} type="text" value={itemName}></InputAuthForm>
            <InputAuthForm type="number" label='price' error={errorInput} value={itemPrice} handler={changePriceHandler}></InputAuthForm>
            <FormControl variant="standard" sx={{minWidth: '60%',marginTop: '5%', paddingBottom: '5%'}} error={errorInput}>
                <InputLabel style={{color: 'white'}} className={cl.selectLabel} id="simple-select-label">brand</InputLabel>
                <Select style={{color: 'white'}} className={cl.selectLabel}
                  labelId="simple-select-label"
                  id="simple-select"
                  value={String(selectedBrand)}
                  label="brand"
                  onChange={brandChange}
                >
                    {brandState?.map((brand) => {return <MenuItem key={brand.id} className={cl.selectItem} value={brand.id}>{brand.name}</MenuItem>})}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{minWidth: '60%'}} error={errorInput}>
                <InputLabel style={{color: 'white'}} className={cl.selectLabel} id="simple-select-label">type</InputLabel>
                <Select style={{color: 'white'}} className={cl.selectLabel}
                  labelId="simple-select-label"
                  id="simple-select"
                  value={String(selectedType)}
                  label="type"
                  onChange={typeChange}
                >
                    {typeState?.map((type) => {return <MenuItem key={type.id} className={cl.selectItem} value={type.id}>{type.name}</MenuItem>})}
                </Select>
            </FormControl>
            <InputAuthForm label="preview" error={errorInput} handler={changePreviewHandler} type="file" accept=".jpg"></InputAuthForm>
            <InputAuthForm label="product photo" error={errorInput} handler={changePhotoHandler} type="file" multiple={true} accept=".jpg"></InputAuthForm>
            <Container className={cl.ContainerEntry}>
                <InputAuthForm label="title" error={errorInputEntry} handler={changeTitle} type="text" value={title}></InputAuthForm>
                <InputAuthForm label="description" error={errorInputEntry} handler={changeDescription} type="text" value={description}></InputAuthForm>
                <ButtonAuthForm handler={addEntry}>add entry</ButtonAuthForm>
            </Container>
            <Container>
                    {info ? info.map((entry) => {
                        const moderated = badUser({title: entry.title,description: entry.description, isBadUser: false});
                        if (!moderated.isBadUser) {
                            moderated.title = formattedFilter({text: moderated.title, lengthString: 15});
                            moderated.description = formattedFilter({text: moderated.description, lengthString: 25});
                        }

                    return (
                        <Container className={cl.ContainerEntryBlock}>
                            <button className={cl.ContainerEntryBlockRemove}><img src={deleteIcon} alt="delete" /></button>
                            <Container className={cl.ContainerEntryBlockText}>
                                <Typography dangerouslySetInnerHTML={{ __html: moderated.title }} variant='h2'></Typography>
                                <Typography dangerouslySetInnerHTML={{ __html: moderated.description }}></Typography>
                            </Container>
                        </Container>
                        )
                    }
                    )
                    : <Typography>
                        you haven't added a product description yet
                    </Typography>
                    }
                </Container>
            <ButtonAuthForm handler={createHandler}>create</ButtonAuthForm>
        </Container>
    );
};

export default ItemModalCreate;