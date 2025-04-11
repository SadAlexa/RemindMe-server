import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../service';
import { User } from '../domain';

@Controller()
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('user')
  async getUser(@Body() userId: number): Promise<User> {
    return await this.usersService.getUser(userId);
  }

  @Post('user')
  async updateUser(@Body() user: User): Promise<void> {
    return await this.usersService.updateUser(user);
  }
}
