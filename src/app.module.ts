import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './user/auth.module';
import { JwtStrategy } from './user/middleware';
import { JwtGuard } from './user/guard/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { ListModule } from './list/list.module';
import { TagModule } from './tag/tag.module';
import { TagsOnTaskModule } from './tags-on-task/tags-on-task.module';
import { UserAchievementModule } from './user-achievement/user-achievement.module';
import { NotificationModule } from './notification/notification.module';
import { TaskModule } from './task/task.module';
import { JwtConfigModule } from './utils/jwt-config.module';

@Module({
  imports: [
    AuthModule,
    JwtConfigModule,
    CategoryModule,
    ListModule,
    TagModule,
    TaskModule,
    TagsOnTaskModule,
    UserAchievementModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
