import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'

import { Model } from './base'
import { School } from './School'

@Entity({
    name: 'student'
})
export class Student extends Model {
    @Column()
    name: string

    @Column()
    internal_id: string

    @ManyToOne(() => School, school => school.students)
    @JoinColumn({ name: 'school_id' })
    school: School
}
