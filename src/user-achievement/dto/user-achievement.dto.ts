import { IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';

export class UserAchievementDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly achievementId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isCompleted: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly isNotified: boolean;

  @IsNumber()
  @IsNotEmpty()
  readonly number: number;
}
