import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/features/authSlice'

export const store = configureStore ({
    reducer: {
        auth: authSlice,
    },
})