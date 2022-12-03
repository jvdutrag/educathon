import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import * as authSlice from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState().auth.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === 401) {
        // Try to refresh the token
        const refreshTokenResult = await baseQuery('/auth/refresh', api, extraOptions) as any
        
        if (refreshTokenResult.data) {
            // Storing the new token
            api.dispatch(authSlice.login(refreshTokenResult.data))

            // Retrying the original request
            return baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(authSlice.logout())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth as any,
    endpoints: () => ({}),
    keepUnusedDataFor: 30,
    refetchOnMountOrArgChange: true
})
