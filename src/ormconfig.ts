import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'transactions',
  entities: [User, Account, Transaction],
  autoLoadEntities: true,
} as TypeOrmModuleOptions;
