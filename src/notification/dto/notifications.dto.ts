import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class NotificationDTO {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsNumber()
  @IsOptional()
  readonly senderUserId?: number | null;

  @IsNumber()
  @IsNotEmpty()
  readonly sendTime: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isRead: boolean;

  @IsString()
  @IsOptional()
  readonly taskId?: string | null;

  @IsString()
  @IsOptional()
  readonly taskTitle?: string | null;

  @IsString()
  @IsOptional()
  readonly taskListId?: string | null;

  @IsNumber()
  @IsOptional()
  readonly achievementId?: number | null;
}
