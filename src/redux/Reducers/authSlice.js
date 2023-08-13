import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

const initialState = {
    token: "",
    loading: false,
    error: null,
    verificationCode: "",
    message: ""
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(verifyUser.pending, (state, action) => {state.loading = true}),
            builder.addCase(verifyUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log("from verify user", action.payload)
                state.verificationCode = action.payload.verificationCode;
                state.message = action.payload.message;
            }),
            builder.addCase(verifyUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})

export const verifyUser = createAsyncThunk('verifyuser', async (body, {rejectWithValue}) => {
    return Axios.post('http://192.168.100.88:5000/user/verify', body)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data.error))
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
export const { setErrorMessage } = authSlice.actions;