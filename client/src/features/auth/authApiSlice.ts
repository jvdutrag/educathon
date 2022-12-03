import { apiSlice } from '../../app/api/apiSlice'
import { login, logout } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: any) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation({
            query: (credentials: any) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled

                dispatch(logout())
                setTimeout(() => dispatch(apiSlice.util.resetApiState()), 1000)
            }
        }),
        refresh: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                dispatch(login(data))
            }
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshMutation
} = authApiSlice
