import { Module } from '@nestjs/common';
import { ValidateServerController } from './controller/server-validation.controller';

@Module({
  controllers: [ValidateServerController],
})
export class ServerValidationModule {}
