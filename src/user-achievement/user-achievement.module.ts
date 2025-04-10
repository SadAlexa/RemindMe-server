import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { UserAchievementService } from './service/user-achievement.service';
import { UserAchievementController } from './controller/user-achievement.controller';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';
import { JwtConfigModule } from 'src/utils/jwt-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(process.env.DATABASE_URL!),
    JwtConfigModule,
  ],
  controllers: [UserAchievementController],
  providers: [UserAchievementService, JwtDecodeService],
  exports: [UserAchievementService],
})
export class UserAchievementModule {}
