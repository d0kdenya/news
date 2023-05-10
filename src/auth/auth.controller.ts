import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { RefreshToken } from '../decorators/refresh-token.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from '../user/user.model'
import { Token } from '../token/token.model'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход!' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(200)
  @Post('/login')
  async login(@Body() userDto: AuthDto) {
    return await this.authService.login(userDto)
  }

  @ApiOperation({ summary: 'Регистрация!' })
  @ApiResponse({ status: 201, type: User })
  @HttpCode(201)
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return await this.authService.registration(userDto)
  }

  @ApiOperation({ summary: 'Выход!' })
  @ApiResponse({ status: 201, type: Token })
  @HttpCode(200)
  @Post('/logout')
  async logout(@RefreshToken() refreshToken) {
    return await this.authService.logout(refreshToken)
  }

  @ApiOperation({ summary: 'Обновить токен!' })
  @ApiResponse({ status: 201, type: Token })
  @HttpCode(200)
  @Post('/refresh')
  async refresh(@RefreshToken() refreshToken) {
    return await this.authService.refresh(refreshToken)
  }
}
