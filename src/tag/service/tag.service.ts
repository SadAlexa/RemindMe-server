import { Inject, Injectable } from '@nestjs/common';
import { DrizzleRemindMe } from 'src/db/database.module';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { Tag } from '../domain';
import { eq } from 'drizzle-orm';
import { tagsTable } from 'src/db/entities';

@Injectable()
export class TagService {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleRemindMe) {}

  async getTags(listId: number): Promise<Array<Tag>> {
    return await this.db.query.tagsTable
      .findMany({
        where: eq(tagsTable.listId, listId),
      })
      .then((tags) =>
        tags.map((tag) => new Tag(tag.title, tag.listId, tag.userId, tag.id)),
      );
  }

  async insertTags(tags: Array<Tag>): Promise<void> {
    await this.db.insert(tagsTable).values(tags);
  }
}
