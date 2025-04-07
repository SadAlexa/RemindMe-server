import { Controller, Get, Post, Request } from '@nestjs/common';
import { TagsOnTaskService } from '../service/tags-on-task.service';
import { TagsOnTask } from '../domain';

@Controller('tagsOnTask')
export class TagsOnTaskController {
  constructor(private TagsOnTaskService: TagsOnTaskService) {}

  @Post()
  async insertTagsOnTasks(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.TagsOnTaskService.insertTagsOnTasks(req.body);
  }

  @Get()
  async getTagsOnTasks(@Request() req): Promise<Array<TagsOnTask>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.TagsOnTaskService.getTagsOnTasks(req.user.id);
  }
}
