import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dtos/create-user.dto';
import { auth } from '@/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(credentials: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const user = this.userRepository.create({
      ...credentials,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async generateToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return jwt.sign(payload, auth.secret, { expiresIn: auth.expirationTime });
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.generateToken(user);
  }
}
