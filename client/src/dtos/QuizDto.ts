class AlternativeDto {
    text: string = ''
    correct: boolean = false
}

class QuestionDto {
    text: string = ''
    points: number = 0
    alternatives: AlternativeDto[] = []
}

export class QuizDto {
    name: string = ''
    schoolId: string = ''
    endsAt: string = ''
    questions: QuestionDto[] = []
}