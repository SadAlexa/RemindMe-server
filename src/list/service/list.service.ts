import { Inject, Injectable } from '@nestjs/common';
import { listsTable } from 'src/db/entities';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { List } from '../domain';
import { DrizzleRemindMe } from 'src/db/database.module';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class ListService {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleRemindMe) {}

  async getLists(userId: number): Promise<Array<List>> {
    return await this.db.query.listsTable
      .findMany({
        where: eq(listsTable.userId, userId),
      })
      .then((lists) =>
        lists.map(
          (list) =>
            new List(
              list.id,
              list.title,
              list.userId,
              list.isShared,
              list.body,
              list.image,
              list.sharedUserId,
              list.categoryId,
            ),
        ),
      );
  }

  async insertLists(lists: Array<List>): Promise<void> {
    await this.db
      .insert(listsTable)
      .values(lists)
      .onConflictDoUpdate({
        target: listsTable.id,
        set: {
          title: sql`excluded.title`,
          body: sql`excluded.body`,
          image: sql`excluded.image`,
          isShared: sql`excluded.is_shared`,
          sharedUserId: sql`excluded.shared_user_id`,
          categoryId: sql`excluded.category_id`,
        },
      });
  }
}
