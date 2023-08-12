import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

const initialState = {
    token: "",
    loading: false,
    error: null,
    verificationCode: "",
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(verifyUser.pending, (state, action) => {state.loading = true}),
            builder.addCase(verifyUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log("from fullfilled of verify user",action.payload.data)
                state.verificationCode = action.payload.data.verificationCode;
            }),
            builder.addCase(verifyUser.rejected, (state, action) => {
                state.loading = false;
                console.log("from error of verify user",action.error)
                state.error = action.error.message;
            })

    }
})

export const verifyUser = createAsyncThunk('verifyuser', async (body) => {
    const respose = Axios.post('http://192.168.18.56:5000/user/verify', body);
    return respose;
    // const response = await fetch('http://192.168.18.56:5000/user/verify', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    // })
    // const data = await response.json();
    // console.log("from verify user",data)
    // return data;
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