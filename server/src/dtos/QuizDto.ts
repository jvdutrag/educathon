import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested, ArrayMinSize, IsBoolean, IsDateString } from 'class-validator'
import { Type } from 'class-transformer'

class AlternativeDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsBoolean()
    @IsNotEmpty()
    correct: boolean
}

class QuestionDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsNumber()
    @IsNotEmpty()
    points: number

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)
    @Type(() => AlternativeDto)
    alternatives: AlternativeDto[]
}

export class QuizDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    schoolId: string
    
    @IsDateString()
    @IsNotEmpty()
    endsAt: string

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => QuestionDto)
    questions: QuestionDto[]
}
