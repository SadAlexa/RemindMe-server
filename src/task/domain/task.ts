export class Task {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly listId: string,
    public readonly userId: number,
    public readonly isDone: boolean,
    public readonly body?: string | null,
    public readonly endTime?: string | null,
    public readonly frequency?: number | null,
    public readonly alert?: number | null,
    public readonly image?: string | null,
    public readonly latitude?: number | null,
    public readonly longitude?: number | null,
  ) {}
}
