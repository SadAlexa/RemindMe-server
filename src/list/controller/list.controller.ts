import { Controller, Get, Post, Request } from '@nestjs/common';
import { ListService } from '../service/list.service';
import { List } from '../domain';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Post()
  async insertLists(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.listService.insertLists(req.body);
  }

  @Get()
  async getLists(@Request() req): Promise<Array<List>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.listService.getLists(req.user.id);
  }
}
