import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service';
import {
  CreateUserDto,
  GetUserDto,
  LoginResponseDTO,
  RegisterResponseDTO,
} from '../dto';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() user: GetUserDto,
  ): Promise<LoginResponseDTO | BadRequestException> {
    const userFound = await this.authService.validateUser(
      user.email,
      user.password,
    );
    return await this.authService.login(userFound);
  }

  @Public()
  @Post('register')
  async register(
    @Body() registerBody: CreateUserDto,
  ): Promise<RegisterResponseDTO | BadRequestException> {
    return await this.authService.register(registerBody);
  }
}
