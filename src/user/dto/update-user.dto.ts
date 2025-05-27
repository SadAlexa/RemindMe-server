import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty()
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsDataURI({ message: 'image must be a URI' })
  image: string;
}
