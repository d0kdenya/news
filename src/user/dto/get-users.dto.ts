import { User } from '../user.model'
import { IsEmail, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetUsersDto {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @IsNumber()
  id: number

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsString({ message: 'Почта должна быть строкой!' })
  @IsEmail({}, { message: 'Некорректный email!' })
  email: string

  @ApiProperty({ example: 'username', description: 'Имя пользователя' })
  @IsString({ message: 'Имя пользователя должно быть строкой!' })
  username: string

  constructor(user: User) {
    this.id = user.id
    this.email = user.email
    this.username = user.username
  }
}