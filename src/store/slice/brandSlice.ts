import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'

type BrandState = {
    brands: Brand[] | null,
    idCurentBrand: number | null,
    error?: null | string,
    loading: boolean,
    changes: boolean, // By changing this parameter, the current state data will be reloaded
}
type Brand = {
    id: number,
    name: string
}

export const getAllBrands = createAsyncThunk<Brand[], undefined, { rejectValue: string }>(
    'brand/getAllBrands',
    async function (_, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/brand/';
            const response = await axios.get<Brand[]>(url);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
            
        }
        
    }
)

export const createBrand = createAsyncThunk<undefined, string, { rejectValue: string }>(
    'type/createBrand',
    async function (name, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/brand/';
            await axios.post<Brand>(url, {name}, {headers: {
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
)

export const removeBrand = createAsyncThunk<undefined, number, { rejectValue: string }>(
    'type/removeBrand',
    async function (id, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/brand/';
            await axios.delete<Brand>(url+ `?id=${id}`, {headers: {
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
)


const initialState : BrandState = {
    brands: null,
    idCurentBrand: null,
    error: null,
    loading: false,
    changes: false,
}

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        curentBrand(state, action: PayloadAction<number | null>) {
            state.idCurentBrand = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllBrands.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(removeBrand.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createBrand.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(removeBrand.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
                state.changes = !state.changes;
            })
            .addCase(createBrand.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
                state.changes = !state.changes;
            })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(removeBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    },
})
export const { curentBrand } = brandSlice.actions;

export default brandSlice.reducer;