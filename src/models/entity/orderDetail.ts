import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Products } from './products'
import { Discount } from './discount'
import { Orders } from './order'
import { CreatedUpdated } from '~/common/entity/createdUpdated'

@Entity()
export class OrderDetail extends CreatedUpdated{
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(()=> Orders, (orders)=>orders.orderDetailId )
  @JoinColumn({name:'orderId'})
  orderId?: number

  @Column()
  unit_price?: number
  
  @ManyToOne(() => Products, (product) => product.orderDetailId)
  @JoinColumn({ name: 'productId' })
  productId?: Products

  @ManyToOne(() => Discount, (discount) => discount.orderDetailId)
  @JoinColumn({ name: 'discountId' })
  discountId?: Discount

}