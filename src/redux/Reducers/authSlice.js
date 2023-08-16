import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import instance from '../../utils/Axios/url';

const initialState = {
    token: null,
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
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setVerificationCode: (state, action) => {
            state.token = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    },
    extraReducers: (builder) => {

        // verify User
        builder.addCase(verifyUser.pending, (state, action) => {state.loading = true }),
            builder.addCase(verifyUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log("from verify user", action.payload)
                state.verificationCode = action.payload.verificationCode;
            }),
            builder.addCase(verifyUser.rejected, (state, action) => {
                state.loading = false;
                console.log("from verify error", action)
                state.error = action.payload;
            })


            //signup User
        builder.addCase(signupUser.pending, (state, action) => { state.loading = true }),
            builder.addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log("from signup user", action.payload)
                state.message = action.payload.message;
            }),
            builder.addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                console.log("from signup error", action.payload)
                state.error = action.payload;
            })

            // signin User
        builder.addCase(signinUser.pending, (state, action) => { state.loading = true }),
            builder.addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log("from signin user", action.payload)
                state.token = action.payload.token;
            }),
            builder.addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                console.log("from signin error", action.payload)
                state.error = action.payload;
            })

            // forgot password
        builder.addCase(forgotPassword.pending, (state, action) => { state.loading = true }),
            builder.addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                console.log("from forgot password user", action.payload)
                state.verificationCode = action.payload.verificationCode;
            }),
            builder.addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                console.log("from forgot password error", action.payload)
                state.error = action.payload;
            })

            //reset password
        builder.addCase(resetPassword.pending, (state, action) => { state.loading = true }),
            builder.addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                console.log("from reset password user", action.payload)
                state.message = action.payload.message;
            }),
            builder.addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                console.log("from reset password error", action.payload)
                state.error = action.payload;
            })
    }
})


export const verifyUser = createAsyncThunk('verifyuser', async (body, { rejectWithValue }) => {
    console.log("from thunk verify", body)
    return Axios.post('/user/verify', body)
        .then((response) => { console.log("from thunk verify", response); return response.data})
        .catch((error) => rejectWithValue(error.response.data.error) )
})

export const signupUser = createAsyncThunk('signupuser', async (body, { rejectWithValue }) => {
    console.log("from thunk signup", body)
    return Axios.post('/user/signup', body)
        .then((response) => response.data)
        .catch((error) => { console.log("from signup thunk", error.response.data.error); return rejectWithValue(error.response.data.error) })
})

export const signinUser = createAsyncThunk('signinuser', async (body, { rejectWithValue }) => {
    return Axios.post('/user/signin', body)
        .then((response) => response.data)
        .catch((error) => { console.log("from signin thunk", error.response.data); return rejectWithValue(error.response.data.error) })
})

export const forgotPassword = createAsyncThunk('forgotpassword', async (body, { rejectWithValue }) => {
    return Axios.post('/user/forgot', body)
        .then((response) => response.data)
        .catch((error) => { console.log("from forgot password thunk", error.response.data); return rejectWithValue(error.response.data.error) })
})

export const resetPassword = createAsyncThunk('resetpassword', async (body, { rejectWithValue }) => {
    return Axios.post('/user/reset', body)
        .then((response) => response.data)
        .catch((error) => { console.log("from reset password thunk", error.response.data); return rejectWithValue(error.response.data.error) })
})

export default authSlice.reducer;
export const { setErrorMessage, setToken, setVerificationCode, setMessage } = authSlice.actions;