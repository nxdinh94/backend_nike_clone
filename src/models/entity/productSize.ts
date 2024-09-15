import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Products } from './products'
import { CreatedUpdated } from '~/common/entity/createdUpdated'

@Entity()
export class ProductSize extends CreatedUpdated{
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ length: 100 })
  name?: string

  @Column({ type: 'float' })
  quantiy?: number

  @OneToMany(() => Products, (product) => product.productSizeId)
  productId?: Products[]
}
