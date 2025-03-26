import { Inject, Injectable } from '@nestjs/common';
import { DB_INJECTION_KEY } from '../utils';
import { DrizzleRemindMe } from '../database.module';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(DB_INJECTION_KEY) private dbConnection: DrizzleRemindMe,
  ) {}

  getDbConnection(): DrizzleRemindMe {
    return this.dbConnection;
  }
}
