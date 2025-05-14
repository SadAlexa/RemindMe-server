import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class TagsOnTaskDTO {
  @IsString()
  @IsNotEmpty()
  readonly taskId: string;

  @IsString()
  @IsNotEmpty()
  readonly taskListId: string;

  @IsString()
  @IsNotEmpty()
  readonly tagId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly taskUserId: number;
}
