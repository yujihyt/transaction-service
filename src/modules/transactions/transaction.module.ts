import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from '../../entities/transaction.entity';
import { Account } from '@/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Account])],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
