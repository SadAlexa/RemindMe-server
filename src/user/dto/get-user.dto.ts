import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';
export class GetUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @ApiProperty()
  @IsBoolean()
  alreadyEncrypted: boolean = false;
}
