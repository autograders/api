import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import { AppConfig } from '@configs/app';
import { EnvConfig } from '@configs/env';
import { PlatformConfig } from '@configs/platform';
import { SessionConfig } from '@configs/session';
import { UserAlreadyExist } from '@errors/user/user-already-exist';
import { UserAlreadyVerified } from '@errors/user/user-already-verified';
import { UserIsDeactivated } from '@errors/user/user-is-deactivated';
import { UserNotFound } from '@errors/user/user-not-found';
import { UserNotVerified } from '@errors/user/user-not-verified';
import { ForgotPasswordInput } from '@inputs/auth/forgot-password';
import { ResendEmailVerificationInput } from '@inputs/auth/resend-email-verification';
import { ResetPasswordInput } from '@inputs/auth/reset-password';
import { SignInInput } from '@inputs/auth/sign-in';
import { SignUpInput } from '@inputs/auth/sign-up';
import { VerifyEmailInput } from '@inputs/auth/verify-email';
import { GQLContext } from '@interfaces/gql';
import { getURL } from '@utils/url';

import { DBService } from './db';
import { PasswordService } from './password';
import { TokenService } from './token';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DBService,
    private readonly jwt: JwtService,
    private readonly mailer: MailerService,
    private readonly password: PasswordService,
    private readonly token: TokenService
  ) {}

  async signUp(input: SignUpInput) {
    const user = await this.db.user.findFirst({
      where: {
        OR: [
          {
            email: input.email
          }
        ]
      }
    });

    if (user) {
      throw UserAlreadyExist;
    }

    const newUser = await this.db.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: await this.password.hash(input.password)
      }
    });

    const token = await this.token.create(newUser);

    await this.mailer.sendMail({
      to: newUser.email,
      subject: 'Verify your Autograders email',
      template: 'email-verification',
      context: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        url: getURL(PlatformConfig.routes.verifyEmail, {
          email: token.email,
          token: token.id
        }),
        year: new Date().getFullYear()
      }
    });

    return newUser;
  }

  async resendEmailVerification(input: ResendEmailVerificationInput) {
    const user = await this.db.user.findFirst({
      where: {
        OR: [
          {
            email: input.email
          }
        ]
      }
    });

    if (!user) {
      throw UserNotFound;
    }

    if (user.isDeactivated) {
      throw UserIsDeactivated;
    }

    if (user.isVerified) {
      throw UserAlreadyVerified;
    }

    const token = await this.token.create(user);

    await this.mailer.sendMail({
      to: user.email,
      subject: 'Verify your Autograders email',
      template: 'email-verification',
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        url: getURL(PlatformConfig.routes.verifyEmail, {
          email: token.email,
          token: token.id
        }),
        year: new Date().getFullYear()
      }
    });
  }

  async verifyEmail(input: VerifyEmailInput) {
    const { email } = await this.token.verify({
      id: input.token,
      email: input.email
    });

    const user = await this.db.user.findFirst({
      where: {
        OR: [
          {
            email
          }
        ]
      }
    });

    if (!user) {
      throw UserNotFound;
    }

    if (user.isDeactivated) {
      throw UserIsDeactivated;
    }

    if (user.isVerified) {
      throw UserAlreadyVerified;
    }

    return await this.db.user.update({
      where: {
        id: user.id
      },
      data: {
        isVerified: true
      }
    });
  }

  async signIn(input: SignInInput, ctx: GQLContext) {
    const user = await this.db.user.findUnique({
      where: {
        email: input.email
      }
    });

    if (!user) {
      throw UserNotFound;
    }

    if (!user.isVerified) {
      throw UserNotVerified;
    }

    if (user.isDeactivated) {
      throw UserIsDeactivated;
    }

    await this.password.validate(user.password, input.password);

    ctx.res.cookie(
      SessionConfig.platformCookieName,
      this.jwt.sign({
        id: user.id,
        email: user.email
      }),
      {
        httpOnly: true,
        sameSite: true,
        domain: AppConfig.domain,
        secure: !EnvConfig.isDev,
        maxAge: SessionConfig.maxAge
      }
    );

    return user;
  }

  async signOut(ctx: GQLContext) {
    ctx.res.clearCookie(SessionConfig.platformCookieName, {
      domain: AppConfig.domain
    });
  }

  async forgotPassword(input: ForgotPasswordInput) {
    const user = await this.db.user.findUnique({
      where: {
        email: input.email
      }
    });

    if (!user) {
      throw UserNotFound;
    }

    if (!user.isVerified) {
      throw UserNotVerified;
    }

    if (user.isDeactivated) {
      throw UserIsDeactivated;
    }

    const token = await this.token.create(user);

    await this.mailer.sendMail({
      to: user.email,
      subject: 'Password reset request',
      template: 'forgot-password',
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        url: getURL(PlatformConfig.routes.resetPassword, {
          email: token.email,
          token: token.id
        }),
        year: new Date().getFullYear()
      }
    });
  }

  async resetPassword(input: ResetPasswordInput) {
    const { email } = await this.token.verify({
      id: input.token,
      email: input.email
    });

    const user = await this.db.user.findFirst({
      where: {
        OR: [
          {
            email
          }
        ]
      }
    });

    if (!user) {
      throw UserNotFound;
    }

    if (user.isDeactivated) {
      throw UserIsDeactivated;
    }

    if (!user.isVerified) {
      throw UserNotVerified;
    }

    return await this.db.user.update({
      where: {
        id: user.id
      },
      data: {
        password: await this.password.hash(input.newPassword)
      }
    });
  }
}
