import { Module } from '@nestjs/common';
import postgres from 'postgres';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import { DB_INJECTION_KEY } from './utils';

import * as schema from './entities';
import { Migrator } from './services';

export type DrizzleRemindMe = PostgresJsDatabase<typeof schema>;
export type DrizzleRemindMeTransaction = Parameters<
  Parameters<DrizzleRemindMe['transaction']>['0']
>['0'];
export type QueryClient = postgres.Sql;

export function makeDrizzleRemindMe(dbConnectionString: string) {
  return drizzle(dbConnectionString, { schema });
}

@Module({})
export class DatabaseModule {
  // eslint-disable-next-line @typescript-eslint/require-await
  static async forRoot(dbConnectionString: string) {
    return {
      global: true,
      module: DatabaseModule,
      providers: [
        {
          provide: DB_INJECTION_KEY,
          useFactory: () => {
            return makeDrizzleRemindMe(dbConnectionString);
          },
        },
        Migrator,
      ],
      exports: [DB_INJECTION_KEY, Migrator],
    };
  }
}
