import { Controller, Get, Post, Request } from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { Tag } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';

@Controller('tag')
export class TagController {
  constructor(
    private tagService: TagService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertTags(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.tagService.insertTags(req.body);
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
