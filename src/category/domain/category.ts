export class Category {
  constructor(
    public readonly title: string,
    public readonly userId: number,
    public readonly id?: number,
  ) {}
}
