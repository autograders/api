import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import cuid from 'cuid';

import { Codes, Raise } from '@errors';
import {
  ResetPasswordInput,
  SignInInput,
  SignOutInput,
  SignUpInput
} from '@inputs/auth';
import { PinInput } from '@inputs/common';

import { CryptoService } from './crypto';
import { PinService } from './pin';
import { PrismaService } from './prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly crypto: CryptoService,
    private readonly pin: PinService,
    private readonly prisma: PrismaService
  ) {}

  async signUp(input: SignUpInput) {
    const { email, password } = input;

    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (user && user.isVerified) Raise(Codes.USER_ALREADY_EXIST);

    const newUser = await this.prisma.user.upsert({
      where: {
        email
      },
      create: {
        ...input,
        password: await this.crypto.hash(password)
      },
      update: {
        ...input,
        password: await this.crypto.hash(password)
      }
    });

    const { key } = await this.pin.generate({ email });

    return {
      key,
      newUser
    };
  }

  async verifyEmail(input: PinInput) {
    const user = await this.pin.verify(input);

    return await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        isVerified: true
      }
    });
  }

  async signIn(input: SignInInput) {
    const { email, password } = input;

    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) Raise(Codes.USER_DOES_NOT_EXIST);
    if (!user.isVerified) Raise(Codes.EMAIL_NOT_VERIFIED);
    if (user.isDeactivated) Raise(Codes.USER_IS_DEACTIVATED);

    const validPassoword = await this.crypto.check(user.password, password);

    if (!validPassoword) Raise(Codes.WRONG_CREDENTIALS);

    return user;
  }

  async signOut(user: User, input: SignOutInput) {
    if (input.allDevices) {
      await this.prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          authKey: cuid()
        }
      });
    }
  }

  async resetPassword(input: ResetPasswordInput) {
    const user = await this.pin.verify(input);

    return await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: await this.crypto.hash(input.newPassword)
      }
    });
  }
}
