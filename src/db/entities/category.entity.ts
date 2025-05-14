import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { usersTable } from './user.entity';

export const categoriesTable = pgTable('categories', {
  id: uuid('id').primaryKey(),
  title: varchar('title').notNull(),
  userId: integer('user_id').notNull(),
});

export const categoriesRelations = relations(categoriesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [categoriesTable.userId],
    references: [usersTable.id],
  }),
}));
