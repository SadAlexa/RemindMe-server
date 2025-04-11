import { Inject, Injectable } from '@nestjs/common';
import { DrizzleRemindMe } from 'src/db/database.module';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { eq } from 'drizzle-orm';
import { notificationsTable } from 'src/db/entities';
import { Notification } from '../domain';

@Injectable()
export class NotificationService {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleRemindMe) {}

  async getNotifications(userId: number): Promise<Array<Notification>> {
    return await this.db.query.notificationsTable
      .findMany({
        where: eq(notificationsTable.userId, userId),
      })
      .then((notifications) =>
        notifications.map(
          (notification) =>
            new Notification(
              notification.id,
              notification.title,
              notification.body,
              notification.userId,
              notification.sendTime,
              notification.isRead,
              notification.taskId,
              notification.taskTitle,
              notification.taskListId,
              notification.senderUserId,
              notification.achievementId,
            ),
        ),
      );
  }

  async insertNotifications(notifications: Array<Notification>): Promise<void> {
    await this.db.insert(notificationsTable).values(notifications);
  }
}
