import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { TagsOnTaskService } from './service/tags-on-task.service';
import { TagsOnTaskController } from './controller/tags-on-task.controller';
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
  controllers: [TagsOnTaskController],
  providers: [TagsOnTaskService, JwtDecodeService],
  exports: [TagsOnTaskService],
})
export class TagsOnTaskModule {}
