import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthController, QuizController, SchoolController } from './controllers'
import { AuthService, UserService, TokenService, CnpjService, SchoolService, QuizService, AnswerService } from './services'
import { JwtStrategy, LocalStrategy } from './strategies'

import { User, Token, School, Alternative, Answer, Question, Quiz, Student } from './models'
const entities = [User, Token, School, Alternative, Answer, Question, Quiz, Student]

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: entities,
      synchronize: true
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET
    }),
    PassportModule
  ],
  controllers: [
    AuthController,
    QuizController,
    SchoolController
  ],
  providers: [
    JwtStrategy,
    AuthService,
    UserService,
    LocalStrategy,
    TokenService,
    CnpjService,
    SchoolService,
    QuizService,
    AnswerService
  ]
})
export class AppModule {}
