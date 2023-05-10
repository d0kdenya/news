import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateNewsDto } from './dto/create-news.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { News } from './news.model'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { FilesService } from '../files/files.service'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
    private readonly fileService: FilesService
  ) {}

  async getAll(): Promise<News[]> {
    return await this.newsRepository.find()
  }

  async getById(id: number): Promise<News> {
    return await this.newsRepository.findOneBy({ id })
  }

  async create(userId, newsDto: CreateNewsDto, image: any): Promise<News> {
    const fileName = await this.fileService.createFile(image)
    return await this.newsRepository.save({ ...newsDto, image: fileName, userId })
  }

  async update(id: number, newsDto: CreateNewsDto, image): Promise<UpdateResult> {
    const news = await this.newsRepository.findOneBy({ id })

    if (!news) throw new HttpException('Новость не найдена!', HttpStatus.NOT_FOUND)

    const fileName = await this.fileService.createFile(image)

    return await this.newsRepository.update({ id }, { ...newsDto, image: fileName })
  }

  async delete(id: number): Promise<DeleteResult> {
    const news = await this.newsRepository.findOneBy({ id })

    if (!news) throw new HttpException('Новость не найдена!', HttpStatus.NOT_FOUND)

    return await this.newsRepository.delete({ id })
  }
}
