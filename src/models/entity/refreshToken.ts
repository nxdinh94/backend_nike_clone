
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Users } from "./users"
import { CreatedUpdated } from "~/common/entity/createdUpdated"
@Entity()
export class RefreshToken extends CreatedUpdated{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    token?: string

    @CreateDateColumn()
    createdAt?: Date

    @OneToOne(()=>Users)
    @JoinColumn({name: 'userId'})
    userId?: Users
}