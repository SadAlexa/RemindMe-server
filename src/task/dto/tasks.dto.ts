import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class TaskDTO {
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

  @IsString()
  @IsOptional()
  readonly body?: string | null;

  @IsString()
  @IsOptional()
  readonly image?: string | null;

  @IsNumber()
  @IsOptional()
  readonly endTime?: number | null;

  @IsNumber()
  @IsOptional()
  readonly frequency?: number | null;

  @IsNumber()
  @IsOptional()
  readonly alert?: number | null;

  @IsBoolean()
  @IsNotEmpty()
  readonly isDone: boolean;

  @IsNumber()
  @IsOptional()
  readonly latitude?: number | null;

  @IsNumber()
  @IsOptional()
  readonly longitude?: number | null;
}
