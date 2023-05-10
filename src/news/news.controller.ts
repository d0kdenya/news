import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { CreateNewsDto } from './dto/create-news.dto'
import { User } from '../decorators/user.decorator'
import { NewsService } from './news.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { GetNewsDto } from './dto/get-news.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { News } from './news.model'

@ApiTags('Новости')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Получение всех новостей!' })
  @ApiResponse({ status: 200, type: [News] })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    const news = await this.newsService.getAll()
    return news.map(curNews => new GetNewsDto(curNews))
  }

  @ApiOperation({ summary: 'Получение новости по id!' })
  @ApiResponse({ status: 200, type: News })
  @HttpCode(200)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return new GetNewsDto(await this.newsService.getById(id))
  }

  @ApiOperation({ summary: 'Создание новости!' })
  @ApiResponse({ status: 201, type: News })
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @User() user,
    @Body() newsDto: CreateNewsDto,
    @UploadedFile() image
  ) {
    return await this.newsService.create(user.id, newsDto, image)
  }

  @ApiOperation({ summary: 'Обновление новости!' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() newsDto: CreateNewsDto,
    @UploadedFile() image
  ) {
    return await this.newsService.update(id, newsDto, image)
  }

  @ApiOperation({ summary: 'Удаление новости!' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.newsService.delete(id)
  }
}
