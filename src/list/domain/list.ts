export class List {
  constructor(
    public readonly title: string,
    public readonly userId: number,
    public readonly isShared: boolean,
    public readonly body?: string | null,
    public readonly image?: string | null,
    public readonly sharedUserId?: number | null,
    public readonly categoryId?: number | null,
    public readonly id?: number,
  ) {}
}
