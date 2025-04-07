import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { UserAchievementService } from './service/user-achievement.service';
import { UserAchievementController } from './controller/user-achievement.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(process.env.DATABASE_URL!),
  ],
  controllers: [UserAchievementController],
  providers: [UserAchievementService],
  exports: [UserAchievementService],
})
export class UserAchievementModule {}
