import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ListService } from '../service/list.service';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';
import { ListsDTO } from '../dto/lists.dto';

@Controller('list')
export class ListController {
  constructor(
    private listService: ListService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertLists(@Body() listsDTO: Array<ListsDTO>): Promise<void> {
    await this.listService.insertLists(listsDTO);
  }

  @Get()
  async getLists(@Request() req): Promise<Array<ListsDTO>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    console.log(obj);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.listService.getLists(obj.id);
  }
}
