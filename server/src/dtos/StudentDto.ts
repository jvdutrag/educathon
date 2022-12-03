import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator'

export class StudentDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @Length(11)
    cpf: string

    @IsString()
    @IsNotEmpty()
    schoolId: string
}
