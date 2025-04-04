import { ApiProperty } from '@nestjs/swagger';
import {
  IsDataURI,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class UpdateUserDto {
  @ApiProperty()
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsDataURI({ message: 'image must be a URI' })
  image: string;
}
