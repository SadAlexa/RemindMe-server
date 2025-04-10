import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
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
  controllers: [CategoryController],
  providers: [CategoryService, JwtDecodeService],
  exports: [CategoryService],
})
export class CategoryModule {}
