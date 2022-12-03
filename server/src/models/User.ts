import { Entity, Column, OneToMany } from 'typeorm'

import { Model } from './base'
import { School } from './School'

@Entity({
    name: 'user'
})
export class User extends Model {
    @Column()
    name: string

    @Column()
    email: string

    @Column({ type: 'text' })
    secret?: string

    @Column({ nullable: true })
    document?: string

    @OneToMany(() => School, school => school.owner)
    ownering_schools: School[]
}
