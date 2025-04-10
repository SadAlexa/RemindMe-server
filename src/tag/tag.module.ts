import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { TagController } from './controller/tag.controller';
import { TagService } from './service/tag.service';
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
  controllers: [TagController],
  providers: [TagService, JwtDecodeService],
  exports: [TagService],
})
export class TagModule {}
