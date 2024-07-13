import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
    id: number;

   @Column()
     email: string;

  @Column()
    password: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAT: Date;

  @OneToMany(() => Category, (category) => category.users)
    categories: Category[];

  @OneToMany(() => Transaction, (transaction) => transaction.users)
    transactions: Transaction[];
}
