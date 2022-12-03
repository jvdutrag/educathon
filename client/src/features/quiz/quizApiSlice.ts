import { apiSlice } from '../../app/api/apiSlice'

import { Quiz } from '../../types'
import { QuizListDto, QuizDto } from '../../dtos'

export const quizApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createQuiz: builder.mutation<Quiz, QuizDto>({
            query: (payload: QuizDto) => ({
                url: '/quiz/create',
                method: 'POST',
                body: payload
            })
        }),
        findQuizes: builder.mutation<QuizListDto, void>({
            query: () => ({
                url: '/quiz',
                method: 'GET'
            })
        }),
        expireQuiz: builder.mutation<QuizListDto, string>({
            query: (id: string) => ({
                url: `/quiz/expire/${id}`,
                method: 'POST'
            })
        }),
        findByCode: builder.mutation<Quiz, string>({
            query: (code: string) => ({
                url: `/quiz/find-by-code/${code}`,
                method: 'GET'
            })
        })
    })
})

export const {
    useCreateQuizMutation,
    useFindQuizesMutation,
    useExpireQuizMutation,
    useFindByCodeMutation
} = quizApiSlice
