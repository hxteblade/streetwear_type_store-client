import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Item } from '../../types/typesItem';

type BasketInfo = {
    basket: null | BasketElem[],
    result: null | boolean,
    loading: boolean,
    error?: null | string,
    triger: boolean,
};
type IBasket = {
    itemId: number,
};
type BasketElem = {
    item: Item,
    amount: number,
}
type rows = {
    rows : IBasket[] | []
}
type IdElem = {
    id: number,
    amount: number,
}


export const addInBasket = createAsyncThunk<boolean, number, { rejectValue: string }>(
    'basket/addInBasket',
    async function (itemId, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/basket/';
            const response = await axios.post(url, {itemId: itemId},{headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }});
            if (response.data) {
                return true;
            }
            return false;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
        }
    }
);

export const getBasket = createAsyncThunk<BasketElem[], undefined, {rejectValue: string }>(
    'basket/getBasket',
    async function (_, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/';
            const {data} = await axios.get<rows>(`${url}basket/user`, {headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
            const arrId = <IdElem[]>[];
            const acc = <BasketElem[]>[];   
            for (const iter of data.rows) {
                let unique = true
                for (const iterUnique of arrId) {
                    if (iter.itemId == iterUnique.id) {
                        unique = false;
                        iterUnique.amount += 1;
                    }
                }
                if (unique) arrId.push({id: iter.itemId, amount: 1});
            }     
            for await (const elem of arrId) {
                const { data } = await axios.get<Item>(url + 'item/' + elem.id);
                acc.push({item: data,amount: elem.amount});
            }
            return acc;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
        }
    }
);

export const deleteOneItemInBasket = createAsyncThunk<boolean, number, {rejectValue: string }>(
    'basket/deleteOneBasket',
    async function (id, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/basket/';
            const {data} = await axios.delete<rows>(url + `?itemId=${id}`, {headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
            if (!data) {
                return false
            }
            return true
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
        }
    }
);

export const deleteAllItemByIdInBasket = createAsyncThunk<boolean, number, {rejectValue: string }>(
    'basket/deleteBasket',
    async function (id, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/basket/all';
            const { data } = await axios.delete(url + `?itemId=${id}`,{headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }});
            if (!data) {
                return false
            }
            return true
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
        }
    }
);

const initialState : BasketInfo = {
    basket: null,
    result: null,
    loading: false,
    error: null,
    triger: false,
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(addInBasket.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(addInBasket.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
                state.triger = !state.triger
            })
            .addCase(addInBasket.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.result = false;
            })
            .addCase(getBasket.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getBasket.fulfilled, (state, action) => {
                state.loading = false;
                state.basket = action.payload
            })
            .addCase(getBasket.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                }
                state.loading = false;
            })
            .addCase(deleteOneItemInBasket.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteOneItemInBasket.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
                state.triger = !state.triger
            })
            .addCase(deleteOneItemInBasket.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.result = false;
            })
            .addCase(deleteAllItemByIdInBasket.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteAllItemByIdInBasket.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
                state.triger = !state.triger
            })
            .addCase(deleteAllItemByIdInBasket.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.result = false;
            })
    },
})

export default basketSlice.reducer;