import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { CreatedUpdated } from '~/common/entity/createdUpdated'
import { Users } from './users'
import { Products } from './products'

@Entity()
export class Reviews extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  description?: string

  @Column()
  quantity?: number

  @ManyToOne(()=> Users, (user)=> user.reviewId)
  @JoinColumn({name: 'userId'})
  userId?: number

  @ManyToOne(()=> Products, (product)=> product.reviewId)
  @JoinColumn({ name: 'productId' })
  productId?: number
}
