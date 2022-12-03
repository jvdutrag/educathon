import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

import { Model } from './base'
import { Quiz } from './Quiz'
import { Alternative } from './Alternative'

@Entity({
  name: 'question'
})
export class Question extends Model {
  @Column()
  text: string

  @ManyToOne(() => Quiz, quiz => quiz.questions)
  @JoinColumn({ name: 'quiz_id'})
  quiz: Quiz

  @Column()
  points: number

  @OneToMany(() => Alternative, alternative => alternative.question, { cascade: true })
  alternatives: Alternative[]
}
