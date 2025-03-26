import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const achievementsTable = pgTable('achievements', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title').notNull(),
  body: varchar('body').notNull(),
  number: integer('number').notNull(),
});
