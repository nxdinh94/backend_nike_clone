import{ Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Users {
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
}


