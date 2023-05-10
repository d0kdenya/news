import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    @IsNotEmpty({ message: 'Почта не должна быть пустой!' })
    @IsEmail()
    readonly email: string

    @ApiProperty({ example: '123321', description: 'Пароль' })
    @IsString({ message: 'Пароль должен быть строкой!' })
    @IsNotEmpty({ message: 'Пароль не должен быть пустым!' })
    @Length(4, 16, { message: 'Пароль должен быть не меньше 4 и не больше 16!' })
    readonly password: string

    @ApiProperty({ example: 'username', description: 'Имя пользователя' })
    @IsNotEmpty({ message: 'Имя пользователя не должно быть пустым!' })
    @IsString({ message: 'Имя пользователя должно быть строкой!' })
    readonly username: string
}