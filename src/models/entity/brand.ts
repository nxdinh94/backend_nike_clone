import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Products } from './products'
import { CreatedUpdated } from '~/common/entity/createdUpdated'

@Entity()
export class Brand extends CreatedUpdated{
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ length: 100 , unique: true})
  name?: string

  @OneToMany(() => Products, (product) => product.brand)
  product?: Products[]
}
