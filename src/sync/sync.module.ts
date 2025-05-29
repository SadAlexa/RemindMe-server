import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { JwtConfigModule } from 'src/utils/jwt-config.module';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';
import { SyncController } from './controller/sync.controller';
import { SyncService } from './service/sync.service';
import { CategoryService } from 'src/category/service/category.service';
import { ListService } from 'src/list/service/list.service';
import { TagService } from 'src/tag/service/tag.service';
import { TagsOnTaskService } from 'src/tags-on-task/service/tags-on-task.service';
import { TaskService } from 'src/task/service/task.service';
import { UserAchievementService } from 'src/user-achievement/service/user-achievement.service';
import { NotificationService } from 'src/notification/service/notification.service';
import { ListModule } from 'src/list/list.module';
import { TagModule } from 'src/tag/tag.module';
import { TaskModule } from 'src/task/task.module';
import { TagsOnTaskModule } from 'src/tags-on-task/tags-on-task.module';
import { UserAchievementModule } from 'src/user-achievement/user-achievement.module';
import { NotificationModule } from 'src/notification/notification.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(process.env.DATABASE_URL!),
    JwtConfigModule,
    CategoryModule,
    ListModule,
    TagModule,
    TaskModule,
    TagsOnTaskModule,
    UserAchievementModule,
    NotificationModule,
  ],
  controllers: [SyncController],
  providers: [
    CategoryService,
    ListService,
    TagService,
    TaskService,
    TagsOnTaskService,
    UserAchievementService,
    NotificationService,
    SyncService,
    JwtDecodeService,
  ],
  exports: [SyncService],
})
export class SyncModule {}
