import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
