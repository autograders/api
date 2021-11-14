import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class CryptoService {
  async hash(rawPassword: string) {
    return await argon2.hash(rawPassword, { type: argon2.argon2id });
  }

  async check(hash: string, rawPassword: string) {
    return await argon2.verify(hash, rawPassword, {
      type: argon2.argon2id
    });
  }
}
