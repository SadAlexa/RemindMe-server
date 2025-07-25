import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from '../domain';
import { CreateUserDto, LoginResponseDTO, RegisterResponseDTO } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user: User | undefined = await this.usersService.findByEmail(email);
    if (user === undefined) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(
      password + user.salt,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }
  async login(user: User): Promise<LoginResponseDTO> {
    const payload = { email: user.email, id: user.id };
    return Promise.resolve({ accessToken: this.jwtService.sign(payload) });
  }
  async register(user: CreateUserDto): Promise<RegisterResponseDTO> {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const salt = Math.random().toString(36).substring(2, 15);
    const hashedPassword = await bcrypt.hash(user.password + salt, 10);
    const newUser: User = {
      username: user.username,
      email: user.email,
      password: hashedPassword,
      image: null,
      salt: salt,
    };
    await this.usersService.create(newUser);
    return this.login(newUser);
  }
}
