// src/modules/accounts/transaction.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { Transaction } from '../../entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createTransaction(
    accountId: number,
    type: 'deposit' | 'withdraw',
    amount: number,
    userId: number,
  ): Promise<void> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
      relations: ['user'],
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    if (account.user.id !== userId) {
      throw new UnauthorizedException(
        'Esta conta não pertence ao usuário autenticado',
      );
    }

    const isCreditOperation = type === 'deposit';
    const isWithdrawOperation = type === 'withdraw';

    if (
      isWithdrawOperation &&
      amount > Number(account.balance) + Number(account.credit)
    ) {
      throw new UnauthorizedException(
        'Operação não permitida devido a saldo insuficiente',
      );
    }

    const transaction = new Transaction();
    transaction.type = type;
    transaction.amount = amount;
    transaction.account = account;

    // Registra a transação no banco de dados
    await this.transactionRepository.save(transaction);

    // Atualiza o saldo da conta
    if (isCreditOperation) {
      account.balance += amount;
    } else if (isWithdrawOperation) {
      account.balance -= amount;
    }

    await this.accountRepository.save(account);
  }
}
