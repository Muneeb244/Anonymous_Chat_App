import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import instance from '../../utils/Axios/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const initialState = {
    user: null,
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
            state.verificationCode = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {

        // verify User
        builder.addCase(verifyUser.pending, (state, action) => {state.loading = true }),
            builder.addCase(verifyUser.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("from verify user", action.payload)
                state.verificationCode = action.payload.verificationCode;
            }),
            builder.addCase(verifyUser.rejected, (state, action) => {
                state.loading = false;
                // console.log("from verify error", action)
                state.error = action.payload;
            })


            //signup User
        builder.addCase(signupUser.pending, (state, action) => { state.loading = true }),
            builder.addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("from signup user", action.payload)
                state.message = action.payload.message;
            }),
            builder.addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                // console.log("from signup error", action.payload)
                state.error = action.payload;
            })

            // signin User
        builder.addCase(signinUser.pending, (state, action) => { state.loading = true }),
            builder.addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("from signin user", action.payload)
                state.token = action.payload.token;
            }),
            builder.addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                // console.log("from signin error", action)
                state.error = action.payload;
            })

            // forgot password
        builder.addCase(forgotPassword.pending, (state, action) => { state.loading = true }),
            builder.addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("from forgot password user", action.payload)
                state.verificationCode = action.payload.verificationCode;
            }),
            builder.addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                // console.log("from forgot password error", action.payload)
                state.error = action.payload;
            })

            //reset password
        builder.addCase(resetPassword.pending, (state, action) => { state.loading = true }),
            builder.addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("from reset password user", action.payload)
                state.message = action.payload.message;
            }),
            builder.addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                // console.log("from reset password error", action.payload)
                state.error = action.payload;
            })

        //get profile
        builder.addCase(getProfile.pending, (state, action) => { state.loading = true }),
            builder.addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("from get profile user", action.payload)
                state.user = action.payload;
                console.log(state.user)
            }),
            builder.addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                // console.log("from get profile error", action.payload)
                state.error = action.payload;
            })

        // update profile
        builder.addCase(updateProfile.pending, (state, action) => { state.loading = true }),
            builder.addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("from update profile user", action.payload)
                state.message = action.payload.message;
                state.user = action.payload.user;
            }),
            builder.addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                // console.log("from update profile error", action.payload)
                state.error = action.payload;
            })
    }
})


export const verifyUser = createAsyncThunk('verifyuser', async (body, { rejectWithValue }) => {
    return Axios.post('/user/verify', body)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data.error) )
})

export const signupUser = createAsyncThunk('signupuser', async (body, { rejectWithValue }) => {
    console.log("from thunk signup", body)
    return Axios.post('/user/signup', body)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data.error))
})

export const signinUser = createAsyncThunk('signinuser', async (body, { rejectWithValue }) => {
    return Axios.post('/user/signin', body)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data.error))
})

export const forgotPassword = createAsyncThunk('forgotpassword', async (body, { rejectWithValue }) => {
    return Axios.post('/user/forgot', body)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data.error))
})

export const resetPassword = createAsyncThunk('resetpassword', async (body, { rejectWithValue }) => {
    return Axios.post('/user/reset', body)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data.error) )
})

export const getProfile = createAsyncThunk('getprofile', async (body, { rejectWithValue }) => {

    //check point
    const token = await AsyncStorage.getItem('token');
    console.log("from thunk getprofile", token)
    return Axios.get('/user/profile', {
        headers: {
            'authorization': token
        }
    })
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data.error))
})

export const updateProfile = createAsyncThunk('updateprofile', async (body, { rejectWithValue, getState }) => {
    const token = await AsyncStorage.getItem('token');
    return Axios.put('/user/update', body, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data.error))
})

export default authSlice.reducer;
export const { setErrorMessage, setToken, setVerificationCode, setMessage, setUser } = authSlice.actions;