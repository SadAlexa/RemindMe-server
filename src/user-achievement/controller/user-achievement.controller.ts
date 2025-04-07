import { Controller, Get, Post, Request } from '@nestjs/common';
import { UserAchievementService } from '../service/user-achievement.service';
import { UserAchievement } from '../domain';

@Controller('UserAchievement')
export class UserAchievementController {
  constructor(private UserAchievementService: UserAchievementService) {}

  @Post()
  async insertUserAchievements(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.UserAchievementService.insertUserAchievements(req.body);
  }

  @Get()
  async getUserAchievements(@Request() req): Promise<Array<UserAchievement>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.UserAchievementService.getUserAchievements(req.user.id);
  }
}
