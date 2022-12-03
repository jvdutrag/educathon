import { Quiz } from '../types'

import { QuizDto } from './QuizDto'
import { AnswerDto, QuestionAnswerDto } from './AnswerDto'

class QuizListDto {
    expired: Quiz[] = []
    active: Quiz[] = []
}

export {
    QuizDto,
    QuizListDto,
    AnswerDto,
    QuestionAnswerDto
}
