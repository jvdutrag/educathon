import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'

import { Model } from './base'
import { Question } from './Question'

@Entity({
  name: 'alternative'
})
export class Alternative extends Model {
  @Column()
  text: string

  @ManyToOne(() => Question, question => question.alternatives)
  @JoinColumn({ name: 'question_id' })
  question: Question

  @Column()
  correct: boolean
}
