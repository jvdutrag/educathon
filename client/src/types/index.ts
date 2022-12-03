type User = {
    id: string
    name: string
    internal_id?: string
    email: string
    document?: string
    ownering_schools: School[]
    school: School
}

export type School = {
    id: string
    name: string
    cnpj: string
    description?: string
    picture?: string
    owner?: User
    is_owner?: boolean
    staff?: User[]
    students: User[]
}

export class Alternative {
    id: string = ''
    text: string = ''
    correct: boolean = false
}

export class Question {
    id: string = ''
    text: string = ''
    points: number = 0
    alternatives: Alternative[] = []
}

export class Quiz {
    id: string = ''
    name: string = ''
    code?: string
    owner?: User
    school?: School
    questions: Question[] = []
    ends_at: string = ''
    answers_count?: number
}

export class Student {
    name: string = ''
    internalId: string = ''
}
