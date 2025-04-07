import { Inject, Injectable } from '@nestjs/common';
import { DrizzleRemindMe } from 'src/db/database.module';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { eq } from 'drizzle-orm';
import { userAchievementsTable } from 'src/db/entities';
import { UserAchievement } from '../domain';

@Injectable()
export class UserAchievementService {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleRemindMe) {}

  async getUserAchievements(userId: number): Promise<Array<UserAchievement>> {
    return await this.db.query.userAchievementsTable
      .findMany({
        where: eq(userAchievementsTable.userId, userId),
      })
      .then((userAchievements) =>
        userAchievements.map(
          (userAchievement) =>
            new UserAchievement(
              userAchievement.achievementId,
              userAchievement.userId,
              userAchievement.isCompleted,
              userAchievement.isNotified,
              userAchievement.number,
            ),
        ),
      );
  }

  async insertUserAchievements(
    userAchievements: Array<UserAchievement>,
  ): Promise<void> {
    await this.db.insert(userAchievementsTable).values(userAchievements);
  }
}
