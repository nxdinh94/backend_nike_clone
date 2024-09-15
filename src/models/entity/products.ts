import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CartItems } from './cartItem'
import { KindOfPeople } from './kindOfPeople'
import { ProductStyle } from './productStyle'
import { ProductSize } from './productSize'
import { OrderDetail } from './orderDetail'
import { CreatedUpdated } from '~/common/entity/createdUpdated'

@Entity()
export class Products extends CreatedUpdated{
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  subtitle?: string

  @Column({ type: 'float' })
  price?: number

  @Column({ type: 'boolean', default: false })
  favourite?: boolean

  @Column({ type: 'simple-array' })
  image_url?: string[]

  @Column({ type: 'text' })
  description?: string

  @Column()
  material?: string

  @Column()
  color?: number

  @Column()
  style_code?: string

  @Column()
  country?: string

  @Column({ type: 'boolean', default: 0 })
  isProductOfWeek?: boolean

  @Column({ type: 'boolean', default: 0 })
  isNewArrivals?: boolean

  @Column({ type: 'boolean', default: 0 })
  isOnSales?: boolean

  @OneToMany(() => CartItems, (cartItems) => cartItems.productId)
  cartItem?: CartItems[]

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.productId)
  orderDetailId?: OrderDetail[]

  @ManyToOne(() => KindOfPeople, (kindOfPeople) => kindOfPeople.productId)
  @JoinColumn({ name: 'kindOfPeopleId' })
  kindOfPeopleId?: KindOfPeople

  @ManyToOne(() => ProductStyle, (productStyle) => productStyle.productId)
  @JoinColumn({ name: 'productStyleId' })
  productStyleId?: ProductStyle

  @ManyToOne(() => ProductSize, (productSize) => productSize.productId)
  @JoinColumn({ name: 'productSizeId' })
  productSizeId?: ProductSize
}
