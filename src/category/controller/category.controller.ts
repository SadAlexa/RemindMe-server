import { Controller, Get, Post, Request } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { Category } from '../domain';
import { Public } from 'src/public.decorator';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertCategories(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.categoryService.insertCategories(req.body);
  }

  @Public()
  @Get()
  async getCategories(@Request() req): Promise<Array<Category>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    console.log(obj);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.categoryService.getCategories(obj.id);
  }
}
