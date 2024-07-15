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
    return await this.transactionRepository.find({
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

  async findOne (id: number) {
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

  async remove (id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('This category is already in use');
    return this.transactionRepository.delete(id);
  }

  findAllWithPagination (id: number, page?: number, limit?: number) {
    return this.transactionRepository.find({
      where: { id },
      relations: {
        categories: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
