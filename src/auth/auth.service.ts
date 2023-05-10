import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { AuthDto } from './dto/auth.dto'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { User } from '../user/user.model'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from '../token/token.model'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(userDto: AuthDto) {
    const user = await this.validateUser(userDto)
    const refreshToken = await this.tokenRepository.findOneBy({ userId: user.id })
    const tokens = await this.issueTokens(user.id, user.email, user.username)

    refreshToken
      ? await this.tokenRepository.update({ id: refreshToken.id }, { refreshToken: tokens.refreshToken, userId: user.id })
      : await this.tokenRepository.insert({ refreshToken: tokens.refreshToken, userId: user.id })

    return {
      user: await this.returnUserFields(user),
      ...tokens
    }
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)

    if (candidate) throw new HttpException('Пользователь с данным email уже зарегистрирован!', HttpStatus.BAD_REQUEST)

    const hashPassword = await bcrypt.hash(userDto.password, 12)
    const user = await this.userService.createUser({ ...userDto, password: hashPassword })
    const tokens = await this.issueTokens(user.id, user.email, user.username)

    await this.tokenRepository.insert({ refreshToken: tokens.refreshToken, userId: user.id })

    return {
      user: await this.returnUserFields(user),
      ...tokens
    }
  }

  async logout(refreshToken: string): Promise<number> {
    const token = await this.tokenRepository.findOneBy({ refreshToken })

    if (!token) throw new UnauthorizedException({ message: 'Некорректный токен!' })

    await this.tokenRepository.delete({ refreshToken })

    return 1
  }

  async refresh(refreshToken: string) {
    const token = await this.tokenRepository.findOneBy({ refreshToken })

    if (!token) throw new UnauthorizedException({ message: 'Некорректный токен!' })

    const user = await this.userService.getUserById(token.userId)
    const tokens = await this.issueTokens(user.id, user.email, user.username)

    token
      ? await this.tokenRepository.update({ id: token.id }, { refreshToken: tokens.refreshToken, userId: user.id })
      : await this.tokenRepository.insert({ refreshToken: tokens.refreshToken, userId: user.id })

    return {
      user: await this.returnUserFields(user),
      ...tokens
    }
  }

  private async issueTokens(id: number, email: string, username: string) {
    const date = { id, email, username }

    const accessToken = this.jwtService.sign(date, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '3m'
    })

    const refreshToken = this.jwtService.sign(date, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '3d'
    })

    return { accessToken, refreshToken }
  }

  private async returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username
    }
  }

  private async validateUser(userDto: AuthDto) {
    const user = await this.userService.getUserByEmail(userDto.email)

    if (!user) {
      throw new UnauthorizedException({ message: 'Некорректное имя пользователя или пароль!' })
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)

    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({ message: 'Некорректное имя пользователя или пароль!' })
  }
}
