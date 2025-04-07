import { Controller, Get, Post, Request } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { Category } from '../domain';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async insertCategories(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.categoryService.insertCategories(req.body);
  }

  @Get()
  async getCategories(@Request() req): Promise<Array<Category>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.categoryService.getCategories(req.user.id);
  }
}
