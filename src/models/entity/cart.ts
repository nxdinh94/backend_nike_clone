import { CreatedUpdated } from './../../common/entity/createdUpdated';
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Users } from './users'
import { CartItems } from './cartItem'

@Entity()
export class Cart extends CreatedUpdated{
  @PrimaryGeneratedColumn()
  id?: number

  @OneToOne(() => Users)
  @JoinColumn()
  user?: Users

  @OneToMany(() => CartItems, (cartItem) => cartItem.cartId)
  cartItems?: CartItems[]
}
