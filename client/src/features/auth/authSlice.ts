import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null
    },
    reducers: {
        login(state, action) {
            const { access_token, user } = action.payload

            state.token = access_token
            state.user = user
        },
        logout(state) {
            state.token = null
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions

export const selectToken = (state: any) => state.auth.token
export const selectUser = (state: any) => state.auth.user

export default authSlice.reducer



