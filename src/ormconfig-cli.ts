import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'transactions',
  entities: [User, Account, Transaction],
  synchronize: false,
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
} as DataSourceOptions);
