import { Body, Controller, Post, Get, UseGuards, Req, Param } from '@nestjs/common'

import { Request, QuizList } from '../types'
import { QuizService } from '../services'
import { Quiz } from '../models'
import { JwtAuthGuard } from '../guards'
import { QuizDto } from '../dtos'

@Controller('api/quiz')
export class QuizController {
    constructor(
        private quizService: QuizService
    ) {}

    @Get('find-by-code/:code')
    async findByCode(@Param('code') code: string): Promise<Quiz> {
        return this.quizService.findByCode(code)
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Req() req: Request, @Body() dto: QuizDto): Promise<Quiz> {
        const userId = req.user.id

        return this.quizService.create(dto, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post('expire/:id')
    async expire(@Req() req: Request, @Param('id') id: string): Promise<Quiz> {
        const userId = req.user.id

        return this.quizService.expire(id, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req: Request): Promise<QuizList> {
        const userId = req.user.id

        return this.quizService.findAll(userId)
    }
}
