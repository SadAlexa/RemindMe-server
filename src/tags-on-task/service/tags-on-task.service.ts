import { Inject, Injectable } from '@nestjs/common';
import { DrizzleRemindMe } from 'src/db/database.module';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { eq } from 'drizzle-orm';
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
    if (tagsOnTask.length === 0) {
      return;
    }
    await this.db.insert(tagsOnTaskTable).values(tagsOnTask);
  }

  async deleteTagsOnTasks(userId: number): Promise<void> {
    await this.db
      .delete(tagsOnTaskTable)
      .where(eq(tagsOnTaskTable.taskUserId, userId));
  }
}
