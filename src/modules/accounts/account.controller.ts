import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/jwt.strategy';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':accountNumber')
  @UseGuards(JwtAuthGuard)
  async getAccountInfo(
    @Param('accountNumber') accountNumber: string,
    @Req() request: AuthenticatedRequest,
  ) {
    const user = request.user;

    const account = await this.accountService.getAccountInfo(
      accountNumber,
      user.id,
    );

    return {
      accountNumber: account.accountNumber,
      balance: account.balance,
      name: account.user.name,
      userDocument: account.user.document,
    };
  }
}
