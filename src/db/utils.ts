import { Inject } from '@nestjs/common';

export const DB_INJECTION_KEY = 'DB_INJECTION_KEY';

export const InjectDrizzle = () => Inject(DB_INJECTION_KEY);
