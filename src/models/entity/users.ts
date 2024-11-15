import { Entity, PrimaryColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { CartItems } from './cartItem'
import { Orders } from './order'
import { CreatedUpdated } from '~/common/entity/createdUpdated'
import { Reviews } from './reviews'
import { IsFavorite } from './isFavorite'

@Entity()
export class Users extends CreatedUpdated {
  @PrimaryColumn()
  id?: number

  @Column({ nullable: true, default: null })
  name?: string

  @Column({ nullable: false, unique: true })
  email?: string

  @Column({ nullable: false, select: false })
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
  shipAddress?: string

  @Column({ nullable: true, length: 255, default: null })
  paymentInfo?: string

  @Column({ nullable: true, default: 'English', length: 50 })
  language?: string

  @OneToMany(() => Orders, (orders) => orders.user)
  order?: Orders[]

  @OneToMany(() => Reviews, (review) => review.user)
  review?: Reviews[]
  
  @OneToMany(()=> IsFavorite, (isFavorite)=> isFavorite.user)
  isFavorite?: IsFavorite[] 
}
