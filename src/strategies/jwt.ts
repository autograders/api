import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { JWTConfig } from '@configs/jwt';
import { SessionConfig } from '@configs/session';
import { UserIsDeactivated } from '@errors/user/user-is-deactivated';
import { UserNotFound } from '@errors/user/user-not-found';
import { UserNotVerified } from '@errors/user/user-not-verified';
import { DBService } from '@services/db';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly db: DBService) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) return null;
        return req.cookies[SessionConfig.platformCookieName];
      },
      ignoreExpiration: false,
      secretOrKey: JWTConfig.secret
    });
  }

  async validate(data: any) {
    const user = await this.db.user.findUnique({
      where: {
        id: data.id
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

    return user;
  }
}
