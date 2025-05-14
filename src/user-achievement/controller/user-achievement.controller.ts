import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserAchievementService } from '../service/user-achievement.service';
import { UserAchievement } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';
import { UserAchievementDTO } from '../dto/user-achievement.dto';

@Controller('userAchievement')
export class UserAchievementController {
  constructor(
    private UserAchievementService: UserAchievementService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertUserAchievements(
    @Body() userAchievementsDTO: Array<UserAchievementDTO>,
  ): Promise<void> {
    await this.UserAchievementService.insertUserAchievements(
      userAchievementsDTO,
    );
  }

  @Get()
  async getUserAchievements(@Request() req): Promise<Array<UserAchievement>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    console.log(obj);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.UserAchievementService.getUserAchievements(req.user.id);
  }
}
