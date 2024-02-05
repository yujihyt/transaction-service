import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getAccountInfo(
    accountNumber: string,
    userId: number,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { accountNumber },
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

    return account;
  }
}
