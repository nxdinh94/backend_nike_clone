import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CreatedUpdated } from '~/common/entity/createdUpdated'
import { ProductImages } from './product_images'
import { ProductSize } from './productSize'
import { Products } from './products'

@Entity({ name: 'colors' })
export class Color extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ length: 100, unique: true })
  name?: string

  @OneToMany(() => ProductImages, (productImage) => productImage.colorId)
  productImageId?: ProductImages[]

  @OneToMany(() => ProductSize, (productSize) => productSize.colorId)
  productSizeId?: ProductSize[]

  @OneToMany(() => Products, (product) => product.color)
  product?: Products[]

}
