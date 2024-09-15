import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Products } from './products'
import { Orders } from './order'
import { CreatedUpdated } from '~/common/entity/createdUpdated'

@Entity()
export class Payment extends CreatedUpdated{
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ default: 0 })
  status?: boolean

  @Column({ default: 0 })
  paymentMethod?: number
}
