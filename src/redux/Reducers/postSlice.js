import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    posts: [],
    loading: false,
    error: null,
    message: ""
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        filterPosts(state, action) {
            const { userCoordinates } = action.payload;
            state.filteredPosts = state.posts.filter((post) => {
                const distance = calculateDistance(userCoordinates, post.coordinates);
                return distance <= 10;
            });
        },
    },
    extraReducers: (builder) => {
        // get posts
        builder.addCase(getPosts.pending, (state, action) => { state.loading = true }),
            builder.addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false
                // console.log("from get posts fullfill", action.payload)
                state.posts = action.payload
            }),
            builder.addCase(getPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            }),

            // post
            builder.addCase(post.pending, (state, pending) => { state.loading = true }),
            builder.addCase(post.fulfilled, (state, action) => {
                state.loading = false
                // console.log("from post fullfill", action.payload)
                state.message = action.payload.message
            }),
            builder.addCase(post.rejected, (state, action) => {
                state.loading = false
                // console.log("from post error", action.payload)
                state.error = action.payload
            })
    }
});

// export const getPosts = createAsyncThunk('post/getPosts', async () => {
export const getPosts = createAsyncThunk('getPosts', async (body, { rejectWithValue }) => {
    console.log("body from async thunk is: ", body)
    const token = await AsyncStorage.getItem('token');
    return axios.post('/post/', body, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => response.data)
        .catch((error) => { console.log("from thunk error", error); return rejectWithValue(error.response.data.error) })
})

export const post = createAsyncThunk('post', async (body, { rejectWithValue }) => {
    const token = await AsyncStorage.getItem('token');
    return axios.post('/post/post', body, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data.error))
})

export default postSlice.reducer;
export const { setErrorMessage, setMessage, setPosts } = postSlice.actions;