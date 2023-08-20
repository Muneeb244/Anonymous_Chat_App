import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Reducers/authSlice';
import postSlice from '../Reducers/postSlice';

export const store = configureStore({
    reducer: {
        user: authSlice,
        post: postSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})