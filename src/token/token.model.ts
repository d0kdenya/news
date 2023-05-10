import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { User } from '../user/user.model'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Token {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Refresh Token'
  })
  @Column({
    unique: true
  })
  refreshToken: string

  @ApiProperty({ example: '1', description: 'ID пользователя, которому принадлежит токен' })
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: number
}