import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import axios from 'axios'
import { IUser } from '../../types/typesUser';

type Auth = {
    auth: boolean,
    nameUser: null | string,
    error?: null | string,
    loading: boolean,
    result: boolean,
    role: string
}
type token = {
    token: string
}
type role = {
    role: string,
    email: string,
}

export const login = createAsyncThunk<{role: string, name: string}, IUser, { rejectValue: string }>(
    'user/login',
    async function ({email, password}, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/user/login';
            const { data } = await axios.post<token>(url, {email, password});
            localStorage.setItem('token', data.token);
            const role: role = jwtDecode(data.token);
            return {role: role.role, name: role.email};
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
            
        }
        
    }
)
export const registration = createAsyncThunk<{role: string, name: string}, IUser, { rejectValue: string }>(
    'user/registration',
    async function ({email, password}, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/user/registration';
            const { data } = await axios.post<token>(url, {email, password, role: 'ADMIN'});
            localStorage.setItem('token', data.token);
            const role: role = jwtDecode(data.token);
            return {role: role.role, name: role.email};
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
        }
    }
)
export const check = createAsyncThunk<{role: string, name: string}, undefined, { rejectValue: string }>(
    'user/checkAuth',
    async function (_, { rejectWithValue }) {
        try {
            const url = 'http://localhost:5000/api/user/auth';
        const { data } = await axios.get<token>(url,{headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }});
        localStorage.setItem('token', data.token);
        const role: role = jwtDecode(data.token);
        return {role: role.role, name: role.email};
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue('Что то сломалось');
        }
    }
)

const initialState : Auth = {
    auth: false,
    nameUser: null,
    error: null,
    loading: false,
    result: false,
    role: 'USER'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout (state) {
            state.auth = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers(builder) {
        builder
            .addCase(registration.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.result = false
            })
            .addCase(login.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.result = false
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.auth = true;
                state.error = null;
                state.loading = false;
                state.result = true;
                state.role = action.payload.role;
                state.nameUser = action.payload.name;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.auth = true;
                state.error = null;
                state.loading = false;
                state.result = true;
                state.role = action.payload.role;
                state.nameUser = action.payload.name;
            })
            .addCase(check.fulfilled, (state, action) => {
                state.auth = true;
                state.role = action.payload.role;
                state.nameUser = action.payload.name;
            })
            .addCase(check.rejected, (state) => {
                state.auth = false;
                state.result = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.result = true;
            })
            .addCase(registration.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.result = true;
            })
    },
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;