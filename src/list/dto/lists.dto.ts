import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ListsDTO {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  readonly userId: number;

  @IsOptional()
  @IsString()
  readonly body?: string | null;

  @IsOptional()
  @IsString()
  readonly image?: string | null;

  @IsBoolean()
  readonly isShared: boolean;

  @IsOptional()
  readonly sharedUserId?: number | null;

  @IsOptional()
  @IsString()
  readonly categoryId?: string | null;
}
