import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice';
import modalReducer from './slice/modalSlice';
import typeReducer from './slice/typeSlice';
import brandReducer from './slice/brandSlice';
import itemReducer from './slice/itemSlice';
import basketReducer from "./slice/basketSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalReducer,
        type: typeReducer,
        brand: brandReducer,
        item: itemReducer,
        basket: basketReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;