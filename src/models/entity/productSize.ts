import { JoinColumn } from 'typeorm';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Products } from './products'
import { CreatedUpdated } from '~/common/entity/createdUpdated'
import { Sizes } from './size';
import { Color } from './color';

@Entity()
export class ProductSize extends CreatedUpdated{
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'integer' })
  quantiy?: number

  @ManyToOne(() => Products, (product) => product.productSizeId)
  @JoinColumn({name : 'productId'})
  productId?: Products

  @ManyToOne(() => Sizes, (size) => size.productSizeId)
  @JoinColumn({name : 'sizeId'})
  sizeId?: Sizes

  @ManyToOne(() => Color, (Color) => Color.productSizeId)
  @JoinColumn({name : 'colorId'})
  colorId?: Sizes


}
