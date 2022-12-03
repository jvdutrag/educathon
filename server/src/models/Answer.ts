import { Entity, OneToOne, ManyToOne, JoinColumn } from 'typeorm'

import { Model } from './base'
import { Question } from './Question'
import { Student } from './Student'
import { Alternative } from './Alternative'
import { Quiz } from './Quiz'

@Entity({
  name: 'answer'
})
export class Answer extends Model {
    @OneToOne(() => Alternative)
    @JoinColumn({ name: 'alternative_id' })
    alternative: Alternative

    @ManyToOne(() => Question, question => question.id)
    @JoinColumn({ name: 'question_id' })
    question: Question

    @ManyToOne(() => Quiz, quiz => quiz.id)
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz

    @OneToOne(() => Student, { nullable: true })
    @JoinColumn({ name: 'student_id' })
    student: Student
}
