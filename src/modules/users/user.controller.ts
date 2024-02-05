// src/modules/users/user.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() credentials: CreateUserDto) {
    const user = await this.userService.createUser(credentials);
    const token = await this.userService.generateToken(user);

    return { user, token };
  }

  @Post('login')
  async loginUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const token = await this.userService.login(username, password);

    return { token };
  }
}
