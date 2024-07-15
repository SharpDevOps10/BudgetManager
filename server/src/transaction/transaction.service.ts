import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor (
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}

  create (createTransactionDto: CreateTransactionDto, userId: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      user: { userId },
      category: { id: +createTransactionDto.category },
    };
    if (!newTransaction) throw new BadRequestException('This category is already in use');

    return this.transactionRepository.save(newTransaction);
  }

  async findAll (id: number) {
    return await this.transactionRepository.findOne({
      where: {
        users: {
          id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update (id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    
    if (!transaction) throw new NotFoundException('This category is already in use');

    await this.transactionRepository.update(id, updateTransactionDto);
    return this.transactionRepository.findOne({
      where: { id },
    });
  }

  remove (id: number) {
    return `This action removes a #${id} transaction`;
  }
}
