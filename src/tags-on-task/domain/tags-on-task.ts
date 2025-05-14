export class TagsOnTask {
  constructor(
    public readonly taskListId: string,
    public readonly taskUserId: number,
    public readonly taskId: string,
    public readonly tagId: string,
  ) {}
}
