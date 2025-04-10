import { Controller, Get, Post, Request } from '@nestjs/common';
import { ListService } from '../service/list.service';
import { List } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';

@Controller('list')
export class ListController {
  constructor(
    private listService: ListService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertLists(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.listService.insertLists(req.body);
  }

  @Get()
  async getLists(@Request() req): Promise<Array<List>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    console.log(obj);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.listService.getLists(obj.id);
  }
}
