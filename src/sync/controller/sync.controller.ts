import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';
import { SyncProps, SyncService } from '../service/sync.service';
import { SyncDTO } from '../dto/sync.dto';

@Controller('sync')
export class SyncController {
  constructor(
    private syncService: SyncService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertData(@Body() syncDTO: SyncDTO): Promise<void> {
    await this.syncService.insertData(syncDTO);
  }

  @Get()
  async getData(@Request() req): Promise<SyncProps> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.syncService.getData(obj.id);
  }
}
