import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products";
import { Users } from "./users";

@Entity({ name: 'isFavorite' })
export class IsFavorite {
    @PrimaryGeneratedColumn()
    id?: number; 


    @ManyToOne(() => Products, (product) => product.isFavorite, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' }) 
    product?: Products; 

    @ManyToOne(() => Users, (user) => user.isFavorite, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user?: Users; 
}
