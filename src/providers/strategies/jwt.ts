import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { JWTConfig } from '@configs/jwt';
import { SessionConfig } from '@configs/session';
import { Codes, Raise } from '@errors';
import { Session } from '@interfaces/session';
import { PrismaService } from '@services/prisma';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) return null;

        return req.cookies[SessionConfig.cookie];
      },
      ignoreExpiration: false,
      secretOrKey: JWTConfig.secret
    });
  }

  async validate(data: Session) {
    const { id, authKey } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) Raise(Codes.UNAUTHORIZED);
    if (user.isDeactivated) Raise(Codes.UNAUTHORIZED);
    if (user.authKey !== authKey) Raise(Codes.UNAUTHORIZED);

    return user;
  }
}
