export class User {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly salt: string,
    public readonly password: string,
    public readonly image?: string | null,
    public readonly id?: number,
  ) {}
}
