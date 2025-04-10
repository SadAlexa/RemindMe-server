import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { NotificationService } from './service/notification.service';
import { NotificationController } from './controller/notification.controller';
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
  controllers: [NotificationController],
  providers: [NotificationService, JwtDecodeService],
  exports: [NotificationService],
})
export class NotificationModule {}
