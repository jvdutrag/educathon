class StudentDto {
    name: string = ''
    internalId: string = ''
}

export class QuestionAnswerDto {
    id: string = ''
    alternativeId: string = ''
}

export class AnswerDto {
    quizId: string = ''
    questions: QuestionAnswerDto[] = []
    student: StudentDto = new StudentDto()
}