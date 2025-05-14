import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { tagsTable } from './tag.entity';
import { tasksTable } from './task.entity';

export const tagsOnTaskTable = pgTable('tasks_tags', {
  taskId: uuid('task_id').notNull(),
  taskListId: uuid('task_list_id').notNull(),
  taskUserId: integer('task_user_id').notNull(),
  tagId: uuid('tag_id').notNull(),
});

export const tagsOnTaskRelations = relations(tagsOnTaskTable, ({ one }) => ({
  tag: one(tagsTable, {
    fields: [tagsOnTaskTable.tagId],
    references: [tagsTable.id],
  }),
  task: one(tasksTable, {
    fields: [
      tagsOnTaskTable.taskId,
      tagsOnTaskTable.taskListId,
      tagsOnTaskTable.taskUserId,
    ],
    references: [tasksTable.id, tasksTable.listId, tasksTable.userId],
  }),
}));
