import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator'

export class UserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    password?: string

    @IsString()
    @IsOptional()
    document?: string
}
