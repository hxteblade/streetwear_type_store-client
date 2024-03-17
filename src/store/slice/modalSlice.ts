import { createSlice } from '@reduxjs/toolkit';

type modal = {
    checkedLogin: boolean,
    checkedItem: boolean,
    checkedTypeAdmin: boolean,
    checkedBrandAdmin: boolean,
    checkedItemAdmin: boolean,
}

const initialState : modal = {
    checkedLogin: false,
    checkedItem: false,
    checkedTypeAdmin: false,
    checkedBrandAdmin: false,
    checkedItemAdmin: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        clickLogin(state) {
            state.checkedLogin = !state.checkedLogin;
        },
        clickItem(state) {
            state.checkedItem = !state.checkedItem;
        },
        clickType(state) {
            state.checkedTypeAdmin = !state.checkedTypeAdmin;
        },
        clickBrand(state) {
            state.checkedBrandAdmin = !state.checkedBrandAdmin;
        },
        clickItemAdmin(state) {
            state.checkedItemAdmin = !state.checkedItemAdmin;
        },
    },
})

export const {clickLogin, clickItem, clickType, clickBrand, clickItemAdmin} = modalSlice.actions;

export default modalSlice.reducer;