import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req, Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthorGuard } from '../auth/guards/author.guard';

@Controller('transaction')
export class TransactionController {
  constructor (private readonly transactionService: TransactionService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post()
  create (
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req,
  ) {
    return this.transactionService.create(createTransactionDto, +req['user'].id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll (@Req() req) {
    return this.transactionService.findAll(+req['user'].id);
  }

  @UseGuards(JwtAuthGuard, AuthorGuard)
  @Patch(':type/:id')
  update (@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard, AuthorGuard)
  @Delete(':type/:id')
  remove (@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, AuthorGuard)
  @Get(':type/pagination')
  findAllWithPagination (
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.transactionService.findAllWithPagination(+req['user'].id, +page, +limit);
  }

  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  findAllByType (
    @Req() req,
    @Param('type') type: string,
  ) {
    return this.transactionService.findAllByType(+req['user'].id, type);
  }
}
