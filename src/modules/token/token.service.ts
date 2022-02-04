import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';

import { TokenConfig } from '@configs/token';
import { ExpiredToken } from '@errors/token/expired-token';
import { InvalidToken } from '@errors/token/invalid-token';
import { TokenAlreadyUsed } from '@errors/token/token-already-used';
import { TokenNotFound } from '@errors/token/token-not-found';
import { UserNotFound } from '@errors/user/user-not-found';
import { Token, TokenDocument } from '@models/token';
import { User, UserDocument } from '@models/user';
import { TokenType } from '@shared/enums/token-type';

import { SendTokenInput } from './dto/send.input';
import { VerifyTokenInput } from './dto/verify.input';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailerService: MailerService
  ) {}

  async send(input: SendTokenInput) {
    const user = await this.userModel.exists({
      email: input.email
    });

    if (!user) {
      throw new UserNotFound();
    }

    switch (input.type) {
      case TokenType.FORGOT_PASSWORD:
        await this.sendResetPasswordToken(input);
        break;
      case TokenType.VERIFY_EMAIL:
        await this.sendEmailVerificationToken(input);
        break;
    }

    return true;
  }

  async verify(input: VerifyTokenInput) {
    const token = await this.tokenModel.findByIdAndUpdate(input.token, {
      $set: {
        isUsed: true
      }
    });

    if (!token) {
      throw new TokenNotFound();
    }

    if (token.email !== input.email) {
      throw new InvalidToken();
    }

    if (token.type !== input.type) {
      throw new InvalidToken();
    }

    const tokenExpired = Date.now() >= token.expiration;

    if (tokenExpired) {
      throw new ExpiredToken();
    }

    if (token.isUsed) {
      throw new TokenAlreadyUsed();
    }

    return token;
  }

  @Cron('0 0 * * * *')
  async cleanExpiredTokens() {
    return await this.tokenModel.deleteMany({
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

  private async sendEmailVerificationToken(input: SendTokenInput) {
    const token = await this.tokenModel.create({
      expiration: Date.now() + TokenConfig.expiresIn,
      type: input.type,
      email: input.email
    });

    await this.mailerService.sendMail({
      to: input.email,
      subject: 'Verify your Autograders email',
      template: 'email-verification',
      context: {
        email: input.email,
        token: token.id,
        year: new Date().getFullYear()
      }
    });
  }

  private async sendResetPasswordToken(input: SendTokenInput) {
    const token = await this.tokenModel.create({
      expiration: Date.now() + TokenConfig.expiresIn,
      type: input.type,
      email: input.email
    });

    await this.mailerService.sendMail({
      to: input.email,
      subject: 'Password reset request',
      template: 'forgot-password',
      context: {
        email: input.email,
        token: token.id,
        year: new Date().getFullYear()
      }
    });
  }
}
