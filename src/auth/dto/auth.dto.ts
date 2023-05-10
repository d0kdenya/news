import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    @IsNotEmpty({ message: 'Почта не должна быть пустой!' })
    @IsEmail()
    readonly email: string

    @ApiProperty({ example: '123321', description: 'Пароль' })
    @IsString({ message: 'Пароль должен быть строкой!' })
    @IsNotEmpty({ message: 'Пароль не должен быть пустым!' })
    readonly password: string
}