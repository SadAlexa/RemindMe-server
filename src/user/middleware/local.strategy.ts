import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service';
import { User } from '../domain';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if (user === undefined) {
      throw new UnauthorizedException("User doesn't exist");
    }
    return user;
  }
}
