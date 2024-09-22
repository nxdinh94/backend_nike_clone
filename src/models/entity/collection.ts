import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CreatedUpdated } from '~/common/entity/createdUpdated'
import { Products } from './products'

@Entity({ name: 'collections' })
export class Collections extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ length: 100, unique: true })
  name?: string

  @OneToMany(()=>Products, (product)=>product.collection)
  product?: Products
}
