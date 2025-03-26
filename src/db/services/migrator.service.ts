import { Injectable } from '@nestjs/common';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { InjectDrizzle } from '../utils';
import { DrizzleRemindMe } from '../database.module';

@Injectable()
export class Migrator {
  constructor(@InjectDrizzle() private dbConnection: DrizzleRemindMe) {}

  async migrate(migrationsFolder: string) {
    await migrate(this.dbConnection, { migrationsFolder });
  }
}
