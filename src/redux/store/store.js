import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Reducers/authSlice';

export const store = configureStore({
    reducer: {
        user: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})