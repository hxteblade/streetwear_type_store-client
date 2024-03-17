import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'
import { IGetItems, IPagination, Item, CreateItem } from '../../types/typesItem';
type ItemsState = {
    items: Item[] | null,
    curentItem: Item | null,
    error?: null | string,
    loading: boolean,
};

type get = {
    count: number,
    rows: Item[],
};


export const createItem = createAsyncThunk<undefined, CreateItem, { rejectValue: string }>(
    'item/createItem',
    async function (item, { rejectWithValue }) {
        try {
            const {name, price, preview, brandId, typeId, info, photos} = item
            const formData = new FormData();
            const url = 'http://localhost:5000/api/item/';
            formData.append('name', name);
            formData.append('price', `${price}`);
            formData.append('preview', preview);
            formData.append('brandId', brandId);
            formData.append('typeId', typeId);
            if(info) formData.append('info', JSON.stringify(info));
            photos?.forEach(photo => {
            formData.append('photo', photo);
            })
            await axios.post(url, formData, {headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }})
            return;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
            
        }
        
    }
);

export const removeItem = createAsyncThunk<undefined, number, { rejectValue: string }>(
    'item/removeItem',
    async function (id, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/item/';
            await axios.delete(url + `?id=${id}`, {headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }});
            return;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
            
        }
        
    }
);

export const getAllItems = createAsyncThunk<Item[], IPagination, { rejectValue: string }>(
    'item/getAllItems',
    async function ({limit, page, typeId, brandId}, { rejectWithValue }) {
        try {
            const searchParams: IGetItems = {brand: '', type: ''};
            if (brandId && !typeId) {
                searchParams.brand = `&brandId=${brandId}`;
            }
            if (!brandId && typeId) {
                searchParams.type = `&typeId=${typeId}`;
            }
            if (brandId && typeId) {
                searchParams.type = `&typeId=${typeId}`;
                searchParams.brand = `&brandId=${brandId}`;
            }
            const url = 'http://localhost:5000/api/item/';
            const response = await axios.get<get>(url + `?limit=${limit}&page=${page}` + searchParams.brand + searchParams.type);
            return response.data.rows;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
            
        }
        
    }
);

export const getOneItems = createAsyncThunk<Item, number , { rejectValue: string }>(
    'item/getOneItems',
    async function (id, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/item/';
            const response = await axios.get<Item>(url + id);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
            
        }
        
    }
);

const initialState : ItemsState = {
    items: null,
    curentItem: null,
    error: null,
    loading: false,
}

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        curentItem(state, action: PayloadAction<number>) {
            localStorage.setItem('curentItemId', String(action.payload));
            state.curentItem = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllItems.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getAllItems.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getAllItems.rejected, (state, action)  => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getOneItems.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getOneItems.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.curentItem = action.payload;
            })
            .addCase(getOneItems.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(removeItem.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(removeItem.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(removeItem.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(createItem.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createItem.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(createItem.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    },
})

export const { curentItem } = itemSlice.actions;

export default itemSlice.reducer;