import { Controller, Post, Param, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/jwt.strategy';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':accountId')
  @UseGuards(JwtAuthGuard)
  async createTransaction(
    @Param('accountId') accountId: number,
    @Body('type') type: 'deposit' | 'withdraw',
    @Body('amount') amount: number,
    @Req() request: AuthenticatedRequest,
  ) {
    const user = request.user;

    await this.transactionService.createTransaction(
      accountId,
      type,
      amount,
      user.id,
    );

    return { message: 'Transação realizada com sucesso' };
  }
}
