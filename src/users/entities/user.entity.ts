/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: 'varchar' })
  fullname: string;
  @Column({type: `varchar`})
  username: string
  @Column({type: `varchar`})
  password: string
}
