import { integer, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { tagsTable } from './tag.entity';
import { tasksTable } from './task.entity';

export const tagsOnTaskTable = pgTable('tasks_tags', {
  taskId: integer('task_id').notNull(),
  taskListId: integer('task_list_id').notNull(),
  taskUserId: integer('task_user_id').notNull(),
  tagId: integer('tag_id').notNull(),
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
