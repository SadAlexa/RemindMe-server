import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { listsTable } from './list.entity';
import { usersTable } from './user.entity';

export const tagsTable = pgTable('tags', {
  id: uuid('id').primaryKey(),
  title: varchar('title').notNull(),
  listId: uuid('list_id').notNull(),
  userId: integer('user_id').notNull(),
});

export const tagsRelations = relations(tagsTable, ({ one }) => ({
  list: one(listsTable, {
    fields: [tagsTable.listId, tagsTable.userId],
    references: [listsTable.id, listsTable.userId],
  }),
  user: one(usersTable, {
    fields: [tagsTable.userId],
    references: [usersTable.id],
  }),
}));
