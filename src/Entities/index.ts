import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Admin" })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: any;
  @Column({
    name: "username",
    type: "varchar",
    length: 50,
    nullable: true,
    default: null,
  })
  username: any;
  @Column({
    name: "email",
    type: "varchar",
    length: 50,
    nullable: true,
    default: null,
  })
  email: any;
  @Column({
    name: "password",
    type: "varchar",
    length: 50,
    nullable: true,
    default: null,
  })
  password: any;
  @Column({
    name: "createdAt",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: any;
}
