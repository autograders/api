import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { TokenConfig } from '@configs/token';
import { ExpiredToken } from '@errors/token/expired-token';
import { InvalidToken } from '@errors/token/invalid-token';
import { TokenAlreadyUsed } from '@errors/token/token-already-used';
import { TokenNotFound } from '@errors/token/token-not-found';
import { CreateTokenInput } from '@inputs/token/create';
import { VerifyTokenInput } from '@inputs/token/verify';
import { Token, TokenDocument } from '@models/token';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly token: Model<TokenDocument>
  ) {}

  async create(input: CreateTokenInput) {
    return await this.token.findOneAndUpdate(
      {
        email: input.email
      },
      {
        $set: {
          email: input.email,
          isUsed: false,
          expiration: Date.now() + TokenConfig.expiresIn
        }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    );
  }

  async verify(input: VerifyTokenInput) {
    const token = await this.token.findByIdAndUpdate(
      input.id,
      {
        $set: {
          isUsed: true
        }
      },
      {
        returnOriginal: true
      }
    );

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

    return token;
  }

  @Cron('0 0 0 * * *')
  async cleanExpiredTokens() {
    return await this.token.deleteMany({
      $or: [
        {
          isUsed: true
        },
        {
          expiration: {
            $lte: Date.now()
          }
        }
      ]
    });
  }
}
