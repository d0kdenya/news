import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { News } from '../news/news.model'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({
    unique: true
  })
  email: string

  @ApiProperty({ example: 'username', description: 'Имя пользователя' })
  @Column()
  username: string

  @ApiProperty({ example: '123321', description: 'Пароль' })
  @Column()
  password: string

  @OneToMany(() => News, news => news.userId)
  news: number[]
}