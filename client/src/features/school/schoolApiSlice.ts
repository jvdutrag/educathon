import { apiSlice } from '../../app/api/apiSlice'

import { School } from '../../types'

export const schoolApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        findSchoolById: builder.mutation<School, string>({
            query: (id: string) => ({
                url: `/school/${id}`,
                method: 'GET'
            })
        }),
        findUserSchools: builder.mutation<School[], void>({
            query: () => ({
                url: '/school/find-by-user',
                method: 'GET'
            })
        })
    })
})

export const {
    useFindSchoolByIdMutation,
    useFindUserSchoolsMutation
} = schoolApiSlice
