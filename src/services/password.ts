import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

import { WrongCredentials } from '@errors/auth/wrong-credentials';

@Injectable()
export class PasswordService {
  async hash(raw: string) {
    return await hash(raw);
  }

  async validate(hash: string, raw: string) {
    if (!(await verify(hash, raw))) {
      throw WrongCredentials;
    }
  }
}
