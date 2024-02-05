// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UserModule } from './modules/users/user.module';
import { Account } from './entities/account.entity';
import { AccountModule } from './modules/accounts/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transactions/transaction.module';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([User, Account, Transaction]),
    UserModule,
    AccountModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
