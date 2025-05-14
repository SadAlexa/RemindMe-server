import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class TagDTO {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly listId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
