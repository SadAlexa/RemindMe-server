import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './user/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './user/middleware';
import { JwtGuard } from './user/guard/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule, JwtModule],
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
