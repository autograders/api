import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { AppConfig } from '@configs/app';
import { EnvConfig } from '@configs/env';
import { SessionConfig } from '@configs/session';
import { GQLContext } from '@interfaces/gql';

@Injectable()
export class SessionService {
  constructor(private readonly jwt: JwtService) {}

  async refresh(user: User, ctx: GQLContext) {
    const token = await this.jwt.signAsync({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      authKey: user.authKey,
      isInstructor: user.isInstructor
    });

    ctx.res.cookie(SessionConfig.cookie, token, {
      httpOnly: true,
      sameSite: true,
      secure: !EnvConfig.isDev,
      maxAge: SessionConfig.maxAge,
      path: '/',
      domain: AppConfig.domain
    });

    return token;
  }
}
