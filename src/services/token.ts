import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { TokenConfig } from '@configs/token';
import { ExpiredToken } from '@errors/token/expired-token';
import { InvalidToken } from '@errors/token/invalid-token';
import { TokenAlreadyUsed } from '@errors/token/token-already-used';
import { TokenNotFound } from '@errors/token/token-not-found';
import { CreateTokenInput } from '@inputs/token/create';
import { VerifyTokenInput } from '@inputs/token/verify';

import { DBService } from './db';

@Injectable()
export class TokenService {
  constructor(private readonly db: DBService) {}

  async create(input: CreateTokenInput) {
    return await this.db.token.upsert({
      where: {
        email: input.email
      },
      update: {
        isUsed: false,
        expiration: Date.now() + TokenConfig.expiresIn
      },
      create: {
        email: input.email,
        isUsed: false,
        expiration: Date.now() + TokenConfig.expiresIn
      }
    });
  }

  async verify(input: VerifyTokenInput) {
    const token = await this.db.token.findUnique({
      where: {
        id: input.id
      }
    });

    if (!token) {
      throw TokenNotFound;
    }

    if (token.email !== input.email) {
      throw InvalidToken;
    }

    const tokenExpired = Date.now() >= token.expiration;

    if (tokenExpired) {
      throw ExpiredToken;
    }

    if (token.isUsed) {
      throw TokenAlreadyUsed;
    }

    return await this.db.token.update({
      where: {
        id: input.id
      },
      data: {
        isUsed: true
      }
    });
  }

  @Cron('0 0 0 * * *')
  async cleanExpiredTokens() {
    return await this.db.token.deleteMany({
      where: {
        OR: [
          {
            isUsed: true
          },
          {
            expiration: {
              lte: Date.now()
            }
          }
        ]
      }
    });
  }
}
