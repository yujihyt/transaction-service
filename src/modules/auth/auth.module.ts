import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { auth } from '@/config';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(auth.secret),
        signOptions: { expiresIn: auth.expirationTime },
      }),
    }),
    ConfigModule,
  ],
  providers: [JwtStrategy, UserService, AuthService],
  exports: [JwtStrategy, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
