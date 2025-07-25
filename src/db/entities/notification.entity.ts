import { integer, pgTable, varchar, boolean, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { usersTable } from './user.entity';
import { tasksTable } from './task.entity';
import { userAchievementsTable } from './user-achievement.entity';

export const notificationsTable = pgTable('notifications', {
  id: varchar('id').primaryKey(),
  title: varchar('title').notNull(),
  body: varchar('body').notNull(),
  userId: integer('user_id').notNull(),
  senderUserId: integer('sender_user_id'),
  sendTime: varchar('send_time').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  taskId: uuid('task_id'),
  taskTitle: varchar('task_title'),
  taskListId: uuid('task_list_id'),
  achievementId: integer('achievement_id'),
});

export const notificationsRelations = relations(
  notificationsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [notificationsTable.userId],
      references: [usersTable.id],
    }),
    senderUser: one(usersTable, {
      fields: [notificationsTable.senderUserId],
      references: [usersTable.id],
    }),
    task: one(tasksTable, {
      fields: [
        notificationsTable.taskId,
        notificationsTable.taskTitle,
        notificationsTable.taskListId,
      ],
      references: [tasksTable.id, tasksTable.title, tasksTable.listId],
    }),
    achievement: one(userAchievementsTable, {
      fields: [notificationsTable.achievementId],
      references: [userAchievementsTable.achievementId],
    }),
  }),
);
