import { Module } from '@nestjs/common'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { News } from './news.model'
import { FilesService } from '../files/files.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([News])
  ],
  controllers: [NewsController],
  providers: [NewsService, FilesService]
})
export class NewsModule {}
