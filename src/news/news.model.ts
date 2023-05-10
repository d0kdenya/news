import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.model'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class News {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок новости' })
  @Column()
  title: string

  @ApiProperty({ example: 'Контент', description: 'Содержание новости' })
  @Column()
  content: string

  @ApiProperty({
    example: '455a33d4-cdfd-4671-91e9-257eccac8f3f.jpg',
    description: 'Изображение'
  })
  @Column({
    nullable: true
  })
  image: string

  @ApiProperty({ example: '1', description: 'ID пользователя, которому принадлежит новость' })
  @ManyToOne(() => User, user => user.news)
  @JoinColumn({ name: 'userId' })
  userId: number
}