// src/entities/account.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  credit: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
