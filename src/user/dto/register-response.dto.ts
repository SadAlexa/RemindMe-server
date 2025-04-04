import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterResponseDTO {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
