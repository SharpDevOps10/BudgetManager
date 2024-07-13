import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
    id: number;
  
  @Column()
    title: string;
  
  @Column()
    amount: number;

  @Column({ nullable: true })
    type: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAT: Date;

  @ManyToOne(() => User, (user) => user.transactions, {
    onDelete: 'CASCADE',
  })
    users: User;

  @ManyToOne(() => Category, (category) => category.transactions, {
    onDelete: 'CASCADE',
  })
    categories: Category;
}
