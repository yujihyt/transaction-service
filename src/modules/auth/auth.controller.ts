import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async validateToken(@Body('token') token: string): Promise<any> {
    if (!token) {
      throw new BadRequestException('Token não fornecido');
    }

    await this.authService.validateToken(token);

    return { message: 'Token válido' };
  }
}
