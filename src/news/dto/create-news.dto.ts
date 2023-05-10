import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateNewsDto {
  @ApiProperty({ example: 'Заголовок', description: 'Заголовок новости' })
  @IsString()
  readonly title: string

  @ApiProperty({ example: 'Контент', description: 'Содержание новости' })
  @IsString()
  readonly content: string

  @ApiProperty({
    example: '455a33d4-cdfd-4671-91e9-257eccac8f3f.jpg',
    description: 'Изображение'
  })
  @IsOptional()
  @IsString()
  readonly image: string

  @ApiProperty({ example: '1', description: 'ID пользователя, которому принадлежит новость' })
  @IsOptional()
  @IsNumber()
  readonly user: number
}