import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
    id: number;

  @Column()
    title: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAT: Date;

  @ManyToOne(() => User, (user) => user.categories, {
    onDelete: 'CASCADE',
  })
    users: User;

  @OneToMany(() => Transaction, (transaction) => transaction.categories)
    transactions: Transaction[];

}
