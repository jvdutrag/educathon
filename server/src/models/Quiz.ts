import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

import { Model } from './base'
import { User } from './User'
import { School } from './School'
import { Question } from './Question'

@Entity({
  name: 'quiz'
})
export class Quiz extends Model {
  @Column()
  name: string

  @Column()
  code: string

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'staff_id' })
  owner: User

  @ManyToOne(() => School, school => school.id)
  @JoinColumn({ name: 'school_id' })
  school: School

  @OneToMany(() => Question, question => question.quiz, { cascade: true })
  questions: Question[]

  @Column({ type: 'timestamp' })
  ends_at: Date
}
