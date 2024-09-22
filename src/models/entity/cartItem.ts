import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreatedUpdated } from "~/common/entity/createdUpdated";
import { Cart } from "./cart";
import { Products } from "./products";

@Entity()
export class CartItems extends CreatedUpdated{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable: true, default: 1})
    quanity?: number

    @Column()
    size?: string

    @ManyToOne(()=> Cart,(cart)=> cart.cartItems )
    @JoinColumn({name: "cartId"})
    cartId?: Cart

    @ManyToOne(()=> Products, (products)=> products.cartItem)
    @JoinColumn ({name: "productId"})
    productId?: Products

}