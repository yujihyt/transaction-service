import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { mysql } from './config';

const {
  host,
  port,
  username,
  password,
  database,
} = mysql;

export default {
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  entities: [User, Account, Transaction],
  autoLoadEntities: true,
} as TypeOrmModuleOptions;
