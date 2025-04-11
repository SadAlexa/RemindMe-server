export class Tag {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly listId: number,
    public readonly userId: number,
  ) {}
}
