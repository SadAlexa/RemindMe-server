import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { Tag } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';
import { TagDTO } from '../dto/tags.dto';

@Controller('tag')
export class TagController {
  constructor(
    private tagService: TagService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertTags(@Body() tagsDTO: Array<TagDTO>): Promise<void> {
    await this.tagService.insertTags(tagsDTO);
  }

  @Get()
  async getTags(@Request() req): Promise<Array<Tag>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    console.log(obj);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.tagService.getTags(obj.id);
  }
}
