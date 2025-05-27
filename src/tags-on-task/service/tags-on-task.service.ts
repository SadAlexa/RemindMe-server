import { Inject, Injectable } from '@nestjs/common';
import { DrizzleRemindMe } from 'src/db/database.module';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { eq, sql } from 'drizzle-orm';
import { tagsOnTaskTable } from 'src/db/entities';
import { TagsOnTask } from '../domain';

@Injectable()
export class TagsOnTaskService {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleRemindMe) {}

  async getTagsOnTasks(userId: number): Promise<Array<TagsOnTask>> {
    return await this.db.query.tagsOnTaskTable
      .findMany({
        where: eq(tagsOnTaskTable.taskUserId, userId),
      })
      .then((tagsOnTasks) =>
        tagsOnTasks.map(
          (tagOnTask) =>
            new TagsOnTask(
              tagOnTask.taskListId,
              tagOnTask.taskUserId,
              tagOnTask.taskId,
              tagOnTask.tagId,
            ),
        ),
      );
  }

  async insertTagsOnTasks(tagsOnTask: Array<TagsOnTask>): Promise<void> {
    await this.db
      .insert(tagsOnTaskTable)
      .values(tagsOnTask)
      .onConflictDoUpdate({
        target: [tagsOnTaskTable.tagId, tagsOnTaskTable.taskId],
        set: {
          tagId: sql`excluded.tag_id`,
          taskId: sql`excluded.task_id`,
        },
      });
  }
}
