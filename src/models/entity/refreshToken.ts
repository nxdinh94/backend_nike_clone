
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Users } from "./users"
@Entity()
export class RefreshToken{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    token?: string

    @CreateDateColumn()
    createdAt?: Date

    @OneToOne(()=>Users)
    @JoinColumn()
    user?: Users
}