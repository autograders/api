import { Injectable } from '@nestjs/common';

import { DBService } from './db';

@Injectable()
export class PlatformAuthService {
  constructor(private readonly db: DBService) {}
}
