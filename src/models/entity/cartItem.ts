import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users";
import { Products } from "./products";
import { Cart } from "./cart";
import { CreatedUpdated } from "~/common/entity/createdUpdated";

@Entity()
export class CartItems extends CreatedUpdated{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable: true, default: 0})
    quanity?: number

    @ManyToOne(()=> Cart,(cart)=> cart.cartItems )
    @JoinColumn({name: "cartId"})
    cartId?: Cart

    @ManyToOne(()=> Products, (products)=> products.cartItem)
    @JoinColumn ({name: "productId"})
    productId?: Products

}