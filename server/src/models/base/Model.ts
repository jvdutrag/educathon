import { PrimaryColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, BeforeInsert } from 'typeorm'
import { v4 as uuid } from 'uuid'

export abstract class Model {
    @PrimaryColumn()
    id: string

    @UpdateDateColumn()
    updated_at: Date
  
    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date
  
    @CreateDateColumn()
    created_at: Date

    @BeforeInsert()
    beforeInsertActions?() {
        this.id = uuid()
    }
}