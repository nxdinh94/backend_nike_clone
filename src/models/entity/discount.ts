import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Products } from './products'
import { OrderDetail } from './orderDetail'
import { CreatedUpdated } from '~/common/entity/createdUpdated'

@Entity()
export class Discount extends CreatedUpdated{
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  discountCode?: string

  @Column({ type: 'float' })
  discountPercentage?: number

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.discountId)
  orderDetailId?: OrderDetail[]
}
