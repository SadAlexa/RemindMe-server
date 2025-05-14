import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
