import { Entity, PrimaryColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { CartItems } from './cartItem'
import { Orders } from './order'
import { CreatedUpdated } from '~/common/entity/createdUpdated'
import { Reviews } from './reviews'

@Entity()
export class Users extends CreatedUpdated {
  @PrimaryColumn()
  id?: number

  @Column({ nullable: true, default: null })
  name?: string

  @Column({ nullable: false, unique: true })
  email?: string

  @Column({ nullable: false })
  password?: string

  @Column({ nullable: true, default: 0 })
  role?: number

  @Column({ nullable: true, default: null, type: 'text' })
  bio?: string

  @Column({ type: Date, nullable: true, default: null })
  dob?: Date

  @Column({ nullable: true, length: 255, default: null })
  country?: string

  @Column({ nullable: true, length: 255, default: null })
  shiping_address?: string

  @Column({ nullable: true, length: 255, default: null })
  payment_info?: string

  @Column({ nullable: true, default: 'English', length: 50 })
  language?: string

  @OneToMany(() => Orders, (orders) => orders.userId)
  orderId?: Orders[]

  @OneToMany(() => Reviews, (review) => review.userId)
  reviewId?: Reviews[]
}
