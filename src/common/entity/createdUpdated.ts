import { CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class CreatedUpdated{
    @CreateDateColumn({name: "created_at", select: false})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at", select: false})
    updatedAt?: Date;
}