export class Tag {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly listId: string,
    public readonly userId: number,
  ) {}
}
