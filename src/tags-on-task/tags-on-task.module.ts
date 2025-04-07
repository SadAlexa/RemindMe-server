import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { TagsOnTaskService } from './service/tags-on-task.service';
import { TagsOnTaskController } from './controller/tags-on-task.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(process.env.DATABASE_URL!),
  ],
  controllers: [TagsOnTaskController],
  providers: [TagsOnTaskService],
  exports: [TagsOnTaskService],
})
export class TagsOnTaskModule {}
