import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../users/user.service';
import { Request } from 'express';
import { auth } from '@/config';

export interface AuthenticatedRequest extends Request {
  user: any;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: auth.secret,
    });
  }

  async validate(payload: any, request: AuthenticatedRequest) {
    request.user = await this.userService.findById(payload.sub);
    return request.user;
  }
}
