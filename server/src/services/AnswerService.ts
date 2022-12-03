import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Answer, Quiz } from '../models'

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>
    ) {}

    public async findByQuiz(quiz: Quiz): Promise<Answer[]> {
        return this.answerRepository.find({
            where: {
                quiz: {
                    id: quiz.id
                }
            }
        })
    }

}
