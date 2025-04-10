import { Controller, Get, Post, Request } from '@nestjs/common';
import { TagsOnTaskService } from '../service/tags-on-task.service';
import { TagsOnTask } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';

@Controller('tagsOnTask')
export class TagsOnTaskController {
  constructor(
    private TagsOnTaskService: TagsOnTaskService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertTagsOnTasks(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.TagsOnTaskService.insertTagsOnTasks(req.body);
  }

  @Get()
  async getTagsOnTasks(@Request() req): Promise<Array<TagsOnTask>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    console.log(obj);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.TagsOnTaskService.getTagsOnTasks(obj.id);
  }
}
