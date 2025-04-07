import { integer, pgTable, varchar, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { usersTable } from './user.entity';
import { tasksTable } from './task.entity';
import { userAchievementsTable } from './user-achievement.entity';

export const notificationsTable = pgTable('notifications', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title').notNull(),
  body: varchar('body').notNull(),
  userId: integer('user_id').notNull(),
  senderUserId: integer('sender_user_id'),
  sendTime: integer('send_time').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  taskId: integer('task_id'),
  taskTitle: varchar('task_title'),
  taskListId: integer('task_list_id'),
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
