import { integer, pgTable, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { usersTable } from './user.entity';
import { achievementsTable } from './achievement.entity';

export const userAchievementsTable = pgTable('user_achievements', {
  achievementId: integer('achievement_id').notNull(),
  userId: integer('user_id').notNull(),
  isCompleted: boolean('is_completed').default(false).notNull(),
  isNotified: boolean('is_notified').default(false).notNull(),
  number: integer('number').default(0).notNull(),
});

export const userAchievementsRelations = relations(
  userAchievementsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userAchievementsTable.userId],
      references: [usersTable.id],
    }),
    achievement: one(achievementsTable, {
      fields: [userAchievementsTable.achievementId],
      references: [achievementsTable.id],
    }),
  }),
);
