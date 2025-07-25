export class Notification {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly body: string,
    public readonly userId: number,
    public readonly sendTime: string,
    public readonly isRead: boolean,
    public readonly taskId?: string | null,
    public readonly taskTitle?: string | null,
    public readonly taskListId?: string | null,
    public readonly senderUserId?: number | null,
    public readonly achievementId?: number | null,
  ) {}
}
