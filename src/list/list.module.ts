import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { ListService } from './service/list.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(process.env.DATABASE_URL!),
  ],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
