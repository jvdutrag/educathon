import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity({
  name: 'token'
})
export class Token {
  @PrimaryColumn()
  id: string

  @Column()
  value: string

  @Column()
  user_id: string

  @Column()
  user_agent: string

  @Column()
  user_ip_address: string

  @Column({ type: 'timestamp' })
  expires_at: Date

  @BeforeInsert()
  beforeInsertActions?() {
    // Get expiration date as UTC
    const expirationDate = new Date(new Date().setDate(new Date().getDate() + Number(process.env.COOKIE_EXPIRATION_IN_DAYS))).setHours(new Date().getHours() + 3)

    this.expires_at = new Date(expirationDate)
    this.id = uuid()
  }
}
