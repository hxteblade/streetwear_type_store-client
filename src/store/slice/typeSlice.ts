import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'

type TypeState = {
    types: Types[] | null,
    idCurentType: number | null,
    error?: null | string,
    loading: boolean,
    changes: boolean, // By changing this parameter, the current state data will be reloaded
}
type Types = {
    id: number,
    name: string
}

export const getAllTypes = createAsyncThunk<Types[], undefined, { rejectValue: string }>(
    'type/getAllTypes',
    async function (_, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/type/';
            const response = await axios.get<Types[]>(url);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
            
        }
        
    }
)

export const createType = createAsyncThunk<Types, string, { rejectValue: string }>(
    'type/createType',
    async function (name, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/type/';
            const response = await axios.post<Types>(url, {name}, {headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }});
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
            
        }
        
    }
)

export const removeType = createAsyncThunk<Types, number, { rejectValue: string }>(
    'type/removeType',
    async function (id, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/type/';
            const response = await axios.delete<Types>(url+ `?id=${id}`, {headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }});
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
            
        }
        
    }
)


const initialState : TypeState = {
    types: null,
    idCurentType: null,
    error: null,
    loading: false,
    changes: false,
}

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        curentType(state, action: PayloadAction<number | null>) {
            state.idCurentType = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllTypes.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(removeType.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createType.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getAllTypes.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.types = action.payload;
            })
            .addCase(removeType.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
                state.changes = !state.changes;
            })
            .addCase(createType.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
                state.changes = !state.changes;
            })
            .addCase(getAllTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(removeType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(createType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    },
})
export const { curentType } = typeSlice.actions;

export default typeSlice.reducer;