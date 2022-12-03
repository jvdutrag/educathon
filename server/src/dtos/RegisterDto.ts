import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator'

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @MinLength(14)
    @MaxLength(14)
    cnpj: string

    @IsString()
    @IsNotEmpty()
    password: string
}
