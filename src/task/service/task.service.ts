import { Inject, Injectable } from '@nestjs/common';
import { DrizzleRemindMe } from 'src/db/database.module';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { Task } from '../domain';
import { eq } from 'drizzle-orm';
import { tasksTable } from 'src/db/entities';

@Injectable()
export class TaskService {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleRemindMe) {}

  async getTasks(userId: number): Promise<Array<Task>> {
    return await this.db.query.tasksTable
      .findMany({
        where: eq(tasksTable.userId, userId),
      })
      .then((tasks) =>
        tasks.map(
          (task) =>
            new Task(
              task.id,
              task.title,
              task.listId,
              task.userId,
              task.isDone,
              task.body,
              task.endTime,
              task.frequency,
              task.alert,
              task.image,
              task.latitude,
              task.longitude,
            ),
        ),
      );
  }

  async insertTasks(tasks: Array<Task>): Promise<void> {
    if (tasks.length === 0) {
      return;
    }
    await this.db.insert(tasksTable).values(tasks);
  }

  async deleteTasks(userId: number): Promise<void> {
    await this.db.delete(tasksTable).where(eq(tasksTable.userId, userId));
  }
}
