import { User, Quiz } from '../models'
import { Request as ExpressRequest } from 'express'

export type AuthResponse = {
    access_token: string
    user: User,
    refresh_token?: string
}

export type Request = ExpressRequest & {
    user: User
}

export type CnpjResponse = {
    name: string
    trade_name: string
    cnpj: string
}

export type SchoolRole = 'OWNER' | 'STAFF' | 'STUDENT'

export type QuizList = {
    expired: Quiz[]
    active: Quiz[]
}
