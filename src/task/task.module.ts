import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';
import { JwtConfigModule } from 'src/utils/jwt-config.module';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(process.env.DATABASE_URL!),
    JwtConfigModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtDecodeService],
  exports: [TaskService],
})
export class TaskModule {}
