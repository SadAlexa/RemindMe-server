export class Tag {
  constructor(
    public readonly title: string,
    public readonly listId: number,
    public readonly userId: number,
    public readonly id?: number,
  ) {}
}
