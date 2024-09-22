import { Entity , Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { ProductSize } from "./productSize";
import { CreatedUpdated } from "~/common/entity/createdUpdated";

@Entity()
export class Sizes  extends CreatedUpdated{

    @PrimaryGeneratedColumn()
    id? : number

    @Column({type: "float", nullable: true, default: null})
    nameSize? : number

    @OneToMany(()=> ProductSize, (productSize) => productSize.sizeId)
    productSizeId?: number
}