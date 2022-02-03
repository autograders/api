import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Strategy } from 'passport-jwt';

import { JWTConfig } from '@configs/jwt';
import { SessionConfig } from '@configs/session';
import { UserIsDeactivated } from '@errors/user/user-is-deactivated';
import { UserNotFound } from '@errors/user/user-not-found';
import { UserNotVerified } from '@errors/user/user-not-verified';
import { User, UserDocument } from '@models/user';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {
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
    const user = await this.userModel.findById(data.id);

    if (!user) {
      throw new UserNotFound();
    }

    if (!user.isVerified) {
      throw new UserNotVerified();
    }

    if (user.isDeactivated) {
      throw new UserIsDeactivated();
    }

    return user;
  }
}
