import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleRemindMe } from 'src/db/database.module';
import { categoriesTable } from 'src/db/entities';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { Category } from '../domain';

@Injectable()
export class CategoryService {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleRemindMe) {}

  async getCategories(userId: number): Promise<Array<Category>> {
    return await this.db.query.categoriesTable.findMany({
      where: eq(categoriesTable.userId, userId),
    });
  }

  async insertCategories(categories: Array<Category>): Promise<void> {
    if (categories.length === 0) {
      return;
    }
    await this.db.insert(categoriesTable).values(categories);
  }

  async deleteCategories(userId: number): Promise<void> {
    await this.db
      .delete(categoriesTable)
      .where(eq(categoriesTable.userId, userId));
  }
}
