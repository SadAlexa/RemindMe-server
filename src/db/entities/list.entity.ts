import {
  integer,
  pgTable,
  varchar,
  boolean,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { usersTable } from './user.entity';
import { categoriesTable } from './category.entity';

export const listsTable = pgTable('lists', {
  id: uuid('id').primaryKey(),
  title: varchar('title').notNull(),
  userId: integer('user_id').notNull(),
  body: text('body'),
  image: text('image'),
  isShared: boolean('is_shared').default(false).notNull(),
  sharedUserId: integer('shared_user_id'),
  categoryId: uuid('category_id'),
});

export const listsRelations = relations(listsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [listsTable.userId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [listsTable.categoryId],
    references: [categoriesTable.id],
  }),
  sharedUser: one(usersTable, {
    fields: [listsTable.sharedUserId],
    references: [usersTable.id],
  }),
}));
