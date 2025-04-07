export class UserAchievement {
  constructor(
    public readonly achievementId: number,
    public readonly userId: number,
    public readonly isCompleted: boolean,
    public readonly isNotified: boolean,
    public readonly number: number,
  ) {}
}
