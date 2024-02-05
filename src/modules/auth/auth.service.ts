import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() {}

  async validateToken(token: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, 'segredo');
      if (!decoded) new UnauthorizedException('Token inválido');
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
