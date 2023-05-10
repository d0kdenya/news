import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.model'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUsersDto } from './dto/get-users.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getAllUsers(): Promise<GetUsersDto[]> {
    const users = await this.userRepository.find()
    return users.map(user => new GetUsersDto(user))
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(dto)
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id })
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email })
  }
}
