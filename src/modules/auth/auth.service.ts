import { auth } from '@/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() {}

  async validateToken(token: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, auth.secret);
      if (!decoded) new UnauthorizedException('Token inválido');
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
