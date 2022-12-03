import * as dotenv from 'dotenv'
dotenv.config()

import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port)
  console.log(`[Server] Running at http://localhost:${port}`)
}

bootstrap()
