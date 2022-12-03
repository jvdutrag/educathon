import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class StudentDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    internalId: string
}

class QuestionDto {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    alternativeId: string
}

export class AnswerDto {
    @IsString()
    @IsNotEmpty()
    quizId: string

    @IsNotEmpty()
    student: StudentDto

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    questions: QuestionDto[]
}
