import { News } from '../news.model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class GetNewsDto {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @IsNumber()
  id: number

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок новости' })
  @IsString()
  title: string

  @ApiProperty({ example: 'Контент', description: 'Содержание новости' })
  @IsString()
  content: string

  @ApiProperty({
    example: '455a33d4-cdfd-4671-91e9-257eccac8f3f.jpg',
    description: 'Изображение'
  })
  @IsString()
  image: string

  @ApiProperty({ example: '1', description: 'ID пользователя, которому принадлежит новость' })
  @IsNumber()
  userId: number

  constructor(news: News) {
    this.id = news.id
    this.title = news.title
    this.content = news.content
    this.image = news.image
    this.userId = news.userId
  }
}