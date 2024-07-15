import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { TransactionService } from '../../transaction/transaction.service';
import { CategoryService } from '../../category/category.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor (
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, type } = request.params;

    let entity;
    if (type === 'transaction') entity = await this.transactionService.findOne(id);
    else if (type === 'category') entity = await this.categoryService.findOne(id);
    else throw new ForbiddenException();

    const user = request.user;

    return entity && user && entity.user.id === user.id;
  }
}