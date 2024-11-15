import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Products } from './products'
import { OrderDetail } from './orderDetail'
import { Users } from './users'
import { Payment } from './payment'
import { CreatedUpdated } from '~/common/entity/createdUpdated'

@Entity()
export class Orders extends CreatedUpdated{
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'int' })
  total?: number

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderId)
  @Column({name: 'orderDetailId'})
  orderDetail?: string

  @ManyToOne(() => Users, (user) => user.order)
  @JoinColumn({ name: 'userId' })
  user?: number

  @OneToOne(() => Payment)
  @JoinColumn({ name: 'paymentId' })
  payment?: number
}
