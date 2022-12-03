import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm'

import { Model } from './base'
import { Student } from './Student'
import { User } from './User'

@Entity({
  name: 'school'
})
export class School extends Model {
  @Column()
  name: string

  @Column()
  company_name: string

  @Column()
  cnpj: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ nullable: true })
  picture?: string

  @ManyToOne(() => User, user => user.ownering_schools, { nullable: true })
  @JoinColumn({ name: 'owner_id'})
  owner?: User

  @ManyToMany(() => User, { nullable: true, cascade: true })
  @JoinTable({ joinColumn: { name: 'room_id' }, inverseJoinColumn: { name: 'user_id' } })
  staff?: User[]

  @OneToMany(() => Student, student => student.school, { cascade: true })
  students: Student[]
}
