import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CartItems } from './cartItem'
import { Genders } from './gender'
import { ProductStyle } from './productStyle'
import { ProductSize } from './productSize'
import { OrderDetail } from './orderDetail'
import { CreatedUpdated } from '~/common/entity/createdUpdated'
import { Reviews } from './reviews'
import { Color } from './color'
import { Collections } from './collection'
import { ProductImages } from './product_images'
import { Brand } from './brand'
import { IsFavorite } from './isFavorite'

@Entity()
export class Products extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column({ nullable: true, default: '' })
  subtitle?: string

  @Column({ type: 'float' })
  price?: number

  @Column('text', { array: true, nullable: true })
  howItMade?: string[]

  @Column({ type: 'text', nullable: true, default: '' })
  description?: string

  @Column({ nullable: true, default: '' })
  material?: string

  @Column({ nullable: true, default: '' })
  colorDescription?: string

  @Column({ nullable: true, default: '' })
  styleCode?: string

  @Column({ nullable: true, default: '' })
  country?: string

  @Column({ type: 'boolean', default: false, select: false })
  isProductOfWeek?: boolean

  @Column({ type: 'boolean', default: false, select: false })
  isNewArrivals?: boolean

  @Column({ type: 'boolean', default: false, select: false })
  isOnSales?: boolean

  @OneToMany(() => CartItems, (cartItems) => cartItems.productId)
  cartItem?: CartItems[]

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail?: OrderDetail[]

  @ManyToOne(() => Color, (color) => color.product)
  @JoinColumn({ name: 'colorId' })
  color?: Color

  @ManyToOne(() => Collections, (collection) => collection.product)
  @JoinColumn({ name: 'collectionId' })
  collection?: Collections

  // @Column('text', { array: true })
  @OneToMany(() => ProductImages, (productImage) => productImage.product)
  image?: ProductImages[]

  @ManyToOne(() => Genders, (gender) => gender.product)
  @JoinColumn({ name: 'genderId' })
  gender?: Genders

  @ManyToOne(() => Brand, (brand) => brand.product)
  @JoinColumn({ name: 'brandId' })
  brand?: Brand

  @ManyToOne(() => ProductStyle, (productStyle) => productStyle.product)
  @JoinColumn({ name: 'styleId' })
  style?: ProductStyle

  @OneToMany(() => ProductSize, (productSize) => productSize.productId)
  productSizeId?: ProductSize[]

  @OneToMany(() => Reviews, (review) => review.product)
  reviewId?: Reviews[]

  @OneToMany(()=> IsFavorite, (isFavorite)=> isFavorite.product)
  isFavorite?: IsFavorite[] 
}
