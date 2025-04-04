import { Inject, Injectable } from '@nestjs/common';
import { DrizzleRemindMe } from 'src/db/database.module';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { eq } from 'drizzle-orm';
import { usersTable } from 'src/db/entities';
import { User } from '../domain';

@Injectable()
export class UsersService {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleRemindMe) {}

  async create(user: User): Promise<void> {
    await this.db.insert(usersTable).values({
      username: user.username,
      email: user.email,
      password: user.password,
      salt: user.salt,
    });
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!user) {
      return undefined;
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      password: user.password,
      salt: user.salt,
    };
  }

  async update(user: User): Promise<void> {
    await this.db
      .update(usersTable)
      .set({
        username: user.username,
        image: user.image,
      })
      .where(eq(usersTable.id, user.id ?? 0));
  }
}
