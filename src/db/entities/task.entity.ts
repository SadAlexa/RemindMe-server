import {
  integer,
  pgTable,
  varchar,
  boolean,
  text,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { usersTable } from './user.entity';
import { listsTable } from './list.entity';

export const tasksTable = pgTable('tasks', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title').notNull(),
  listId: integer('list_id').notNull(),
  userId: integer('user_id').notNull(),
  body: text('body'),
  endTime: integer('end_time'),
  frequency: integer('frequency'),
  alert: integer('alert'),
  image: text('image'),
  isDone: boolean('is_done').default(false).notNull(),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
});

export const tasksRelations = relations(tasksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [tasksTable.userId],
    references: [usersTable.id],
  }),
  list: one(listsTable, {
    fields: [tasksTable.listId, tasksTable.userId],
    references: [listsTable.id, listsTable.userId],
  }),
}));
