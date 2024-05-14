import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
     async({username, password}, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/register', {
                username,
                password,
            })
            if(data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            // Assuming error.response.data contains the error message
            // Adjust based on your API's error format
            return rejectWithValue(error.response.data)
        }
     }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = action.payload.message
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload && action.payload.message) {
                    state.status = action.payload.message
                } else {
                    
                    state.status = 'Registration failed for an unknown reason'
                }
            })
    }
})

export default authSlice.reducer