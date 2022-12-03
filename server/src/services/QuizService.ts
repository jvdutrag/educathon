import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThan } from 'typeorm'

import { UserService } from './UserService'
import { SchoolService } from './SchoolService'
import { AnswerService } from './AnswerService'

import { Quiz, Question, Alternative } from '../models'
import { QuizDto } from '../dtos'
import { QuizList } from '../types'

import Util from '../utils'

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,

        private userService: UserService,
        private schoolService: SchoolService,
        private answerService: AnswerService
    ) {}

    async expire(id: string, userId: string): Promise<Quiz> {
        const quiz = await this.quizRepository.findOne({
            relations: ['owner'],
            where: {
                id
            }
        })

        if (!quiz) {
            throw new Error('Quiz not found')
        }

        if (quiz.owner.id !== userId) {
            throw new Error('User is not owner of quiz')
        }

        quiz.ends_at = new Date()

        return this.quizRepository.save(quiz)
    }

    async findByCode(code: string): Promise<Quiz> {
        return this.quizRepository.findOne({
            where: {
                code,
                ends_at: MoreThan(new Date())
            },
            relations: ['questions', 'questions.alternatives']
        })
    }

    async findAll(userId: string): Promise<QuizList> {
        const quizes = await this.quizRepository.find({
            where: {
                owner: {
                    id: userId
                }
            },
            relations: ['school', 'questions', 'questions.alternatives']
        })

        const parsed = await Promise.all(quizes.map(async quiz => {
            const answers = await this.answerService.findByQuiz(quiz)

            return {
                ...quiz,
                answers_count: answers.length / quiz.questions.length
            }
        }))

        const expired = parsed.filter(q => q.ends_at < new Date())
        const active = parsed.filter(q => q.ends_at >= new Date())

        return {
            expired,
            active
        }
    }

    async create(dto: QuizDto, userId: string): Promise<Quiz> {
        const user = await this.userService.findById(userId)

        if (!user) {
            throw new Error('User not found')
        }

        const school = await this.schoolService.findById(dto.schoolId)

        if (!school) {
            throw new Error('School not found')
        }

        if (!this.schoolService.isUserStaff(school, user)) {
            throw new Error('User is not staff on school')
        }

        const quiz = new Quiz()

        quiz.name = dto.name
        quiz.school = school
        quiz.owner = user
        quiz.code = Util.generateRandomString(6)
        quiz.ends_at = new Date(dto.endsAt)

        quiz.questions = dto.questions.map(q => {
            const question = new Question()

            question.text = q.text
            question.points = q.points

            question.alternatives = q.alternatives.map(a => {
                const alternative = new Alternative()

                alternative.text = a.text
                alternative.correct = a.correct

                return alternative
            })
            
            return question
        })

        return this.quizRepository.save(quiz, { transaction: true })
    }
}
