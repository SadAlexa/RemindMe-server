import { Inject, Injectable } from '@nestjs/common';
import { listsTable } from 'src/db/entities';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { List } from '../domain';
import { DrizzleRemindMe } from 'src/db/database.module';
import { eq } from 'drizzle-orm';

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
              list.title,
              list.userId,
              list.isShared,
              list.body,
              list.image,
              list.sharedUserId,
              list.categoryId,
              list.id,
            ),
        ),
      );
  }

  async insertLists(lists: Array<List>): Promise<void> {
    await this.db.insert(listsTable).values(lists);
  }
}
