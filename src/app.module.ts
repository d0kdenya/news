import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { NewsModule } from './news/news.module'
import { ConfigModule } from '@nestjs/config'
import * as process from 'process'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.model'
import { Token } from './token/token.model'
import { FilesModule } from './files/files.module'
import { News } from './news/news.model'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${ process.env.NODE_ENV }.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Token, News],
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    UserModule,
    NewsModule,
    FilesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
