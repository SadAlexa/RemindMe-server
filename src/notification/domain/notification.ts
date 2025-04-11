export class Notification {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly body: string,
    public readonly userId: number,
    public readonly sendTime: number,
    public readonly isRead: boolean,
    public readonly taskId?: number | null,
    public readonly taskTitle?: string | null,
    public readonly taskListId?: number | null,
    public readonly senderUserId?: number | null,
    public readonly achievementId?: number | null,
  ) {}
}
