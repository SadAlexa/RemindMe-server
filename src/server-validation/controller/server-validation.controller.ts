import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/public.decorator';

export interface ValidateServerProps {
  remindMeServer: boolean;
}

@Controller('ping')
export class ValidateServerController {
  constructor() {}

  @Public()
  @Get()
  async validateServer(): Promise<ValidateServerProps> {
    return await Promise.resolve({
      remindMeServer: true,
    });
  }
}
