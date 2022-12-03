import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './api/apiSlice'

import { authSlice } from '../features'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.default
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
