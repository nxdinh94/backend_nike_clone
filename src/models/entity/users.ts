import{ Entity, PrimaryColumn, Column, OneToMany, OneToOne } from "typeorm";
import { CartItems } from "./cartItem";
import { Orders } from "./order";
import { CreatedUpdated } from "~/common/entity/createdUpdated";

@Entity()
export class Users extends CreatedUpdated{
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ nullable: false })
  email?: string;

  @Column({ nullable: false })
  password?: string;

  @Column({ default: 0 })
  role?: number;

  @Column({ default: '', type: 'text'})
  bio?: string;

  @Column({ type: Date , nullable: true})
  dob?: Date;

  @Column({ nullable: true, length: 255})
  country?: string;

  @Column({ nullable: true, length: 255  })
  shiping_address?: string;

  @Column({ nullable: true, length: 255 })
  payment_info?: string;

  @Column({ default: 'English', length: 50})
  language?: string;

  @OneToMany(() => Orders, (orders) => orders.userId)
  orderId?: Orders[];

}


