import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products";
import { Color } from "./color";
import { CreatedUpdated } from "~/common/entity/createdUpdated";

@Entity()
export class ProductImages extends CreatedUpdated{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    url?: string

    @Column({ nullable: true, default: '' })
    colorShow ?: string

    @ManyToOne(()=> Color, (color)=> color.productImageId)
    @JoinColumn({name: 'colorId'})
    colorId?: Color

    @ManyToOne(()=> Products, (product) => product.image)
    @JoinColumn({name: 'productId'})
    product?: Products

}