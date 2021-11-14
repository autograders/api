import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { generate } from 'generate-password';

import { PinConfig } from '@configs/pin';
import { TemplatesConfig } from '@configs/template';
import { Codes, Raise } from '@errors';
import { EmailInput, PinInput } from '@inputs/common';

import { PrismaService } from './prisma';

@Injectable()
export class PinService {
  constructor(
    private readonly mailer: MailerService,
    private readonly prisma: PrismaService
  ) {}

  async generate(input: EmailInput) {
    const code = generate({
      length: 4,
      numbers: true,
      excludeSimilarCharacters: true,
      strict: true
    });

    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email
      }
    });

    if (!user) return Raise(Codes.USER_DOES_NOT_EXIST);
    if (user.isDeactivated) return Raise(Codes.USER_IS_DEACTIVATED);

    const pin = await this.prisma.pin.upsert({
      where: {
        userId: user.id
      },
      create: {
        code,
        expiresIn: Date.now() + PinConfig.maxAge,
        userId: user.id
      },
      update: {
        code,
        expiresIn: Date.now() + PinConfig.maxAge
      }
    });

    await this.mailer.sendMail({
      to: user.email,
      subject: 'Autograders - Verification Code',
      template: TemplatesConfig.getTemplate('verification-code'),
      context: {
        fullName: `${user.firstName} ${user.lastName}`,
        pin: code,
        year: new Date().getFullYear()
      }
    });

    return pin;
  }

  async verify(input: PinInput) {
    const pin = await this.prisma.pin.findFirst({
      where: {
        key: input.key,
        code: input.code,
        expiresIn: {
          gte: Date.now()
        }
      },
      include: {
        user: true
      }
    });

    if (!pin) Raise(Codes.INVALID_OR_EXPIRED_PIN);

    await this.prisma.pin.delete({
      where: {
        key: input.key
      },
      include: {
        user: true
      }
    });

    return pin.user;
  }

  @Cron('0 0 0 * * *')
  async removeExpiredPins() {
    await this.prisma.pin.deleteMany({
      where: {
        expiresIn: {
          lte: Date.now()
        }
      }
    });
  }
}
