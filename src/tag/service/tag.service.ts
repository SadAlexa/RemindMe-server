import { Inject, Injectable } from '@nestjs/common';
import { DrizzleRemindMe } from 'src/db/database.module';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { Tag } from '../domain';
import { eq } from 'drizzle-orm';
import { tagsTable } from 'src/db/entities';

@Injectable()
export class TagService {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleRemindMe) {}

  async getTags(userId: number): Promise<Array<Tag>> {
    return await this.db.query.tagsTable
      .findMany({
        where: eq(tagsTable.userId, userId),
      })
      .then((tags) =>
        tags.map((tag) => new Tag(tag.id, tag.title, tag.listId, tag.userId)),
      );
  }

  async insertTags(tags: Array<Tag>): Promise<void> {
    await this.db.insert(tagsTable).values(tags);
  }

  async deleteTags(userId: number): Promise<void> {
    await this.db.delete(tagsTable).where(eq(tagsTable.userId, userId));
  }
}
