import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controller/auth.controller';
import { AuthService, UsersService } from './service';
import { JwtStrategy, LocalStrategy } from './middleware';
import { DatabaseModule } from 'src/db/database.module';
import { JwtConfigModule } from 'src/utils/jwt-config.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(process.env.DATABASE_URL!),
    JwtConfigModule,
  ],
  controllers: [AuthController, UserController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
