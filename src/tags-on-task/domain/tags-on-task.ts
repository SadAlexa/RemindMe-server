export class TagsOnTask {
  constructor(
    public readonly taskListId: number,
    public readonly taskUserId: number,
    public readonly taskId: number,
    public readonly tagId: number,
  ) {}
}
