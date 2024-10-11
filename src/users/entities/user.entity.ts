/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  fullname: string;
  @Column({ type: `varchar` })
  username: string;
  @Column({ unique: true, type:"varchar", nullable:true })
  email: string;
  @Column({ type: `varchar` })
  password: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
