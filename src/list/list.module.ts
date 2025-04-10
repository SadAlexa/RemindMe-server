import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { ListController } from './controller/list.controller';
import { ListService } from './service/list.service';
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
  controllers: [ListController],
  providers: [ListService, JwtDecodeService],
  exports: [ListService],
})
export class ListModule {}
