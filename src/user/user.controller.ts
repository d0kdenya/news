import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './user.model'

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получения пользователя по почте!' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email)
  }

  @ApiOperation({ summary: 'Получение всех пользователей!' })
  @ApiResponse({ status: 200, type: [User] })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Создание пользователя!' })
  @ApiResponse({ status: 201, type: User })
  @HttpCode(201)
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.userService.createUser(userDto)
  }
}
