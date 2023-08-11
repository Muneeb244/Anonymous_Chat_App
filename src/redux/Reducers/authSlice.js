import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

const initialState = {
    token: "",
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state, action) => state.loading = true),
            builder.addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.data.token;
            }),
            builder.addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})

export const verifyUser = createAsyncThunk('verifyuser', async (body) => {
    const respose = Axios.post('http://localhost:5000/user/verify', body);
    return respose;
})
export const signupUser = createAsyncThunk('signupuser', async (body) => {
    const respose = Axios.post('http://localhost:5000/user/signup', body);
    return respose;
})
export const signinUser = createAsyncThunk('signupuser', async (body) => {
    const respose = Axios.post('http://localhost:5000/user/signin', body);
    return respose;
})

export default authSlice.reducer;