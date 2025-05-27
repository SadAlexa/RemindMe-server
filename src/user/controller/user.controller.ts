import { Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from '../service';
import { User } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';

@Controller()
export class UserController {
  constructor(
    private usersService: UsersService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Get('user')
  async getUser(@Request() req): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.usersService.getUser(obj.id);
  }

  @Post('user')
  async updateUser(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const obj = await this.jwtDecodeService.decodeToken(token);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.usersService.updateUser(req.body);
  }
}
