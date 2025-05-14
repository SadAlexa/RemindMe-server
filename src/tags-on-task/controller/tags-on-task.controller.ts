import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { TagsOnTaskService } from '../service/tags-on-task.service';
import { TagsOnTask } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';
import { TagsOnTaskDTO } from '../dto/tags-on-task.dto';

@Controller('tagsOnTask')
export class TagsOnTaskController {
  constructor(
    private TagsOnTaskService: TagsOnTaskService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertTagsOnTasks(
    @Body() tagsOnTaskDTO: Array<TagsOnTaskDTO>,
  ): Promise<void> {
    await this.TagsOnTaskService.insertTagsOnTasks(tagsOnTaskDTO);
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
