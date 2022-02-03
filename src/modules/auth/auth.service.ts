import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { hash, verify } from 'argon2';
import { Model } from 'mongoose';

import { EnvConfig } from '@configs/env';
import { SessionConfig } from '@configs/session';
import { WrongCredentials } from '@errors/auth/wrong-credentials';
import { UserAlreadyExist } from '@errors/user/user-already-exist';
import { UserIsDeactivated } from '@errors/user/user-is-deactivated';
import { UserNotFound } from '@errors/user/user-not-found';
import { UserNotVerified } from '@errors/user/user-not-verified';
import { User, UserDocument } from '@models/user';
import { TokenService } from '@modules/token';
import { TokenType } from '@shared/enums/token-type';
import { GQLContext } from '@shared/interfaces/gql-context';

import { ResetPasswordInput } from './dto/reset-password.input';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { VerifyEmailInput } from './dto/verify-email.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwt: JwtService,
    private readonly tokenService: TokenService
  ) {}

  async signUp(input: SignUpInput) {
    const userExist = await this.userModel.exists({
      email: input.email,
      isVerified: true
    });

    if (userExist) {
      throw new UserAlreadyExist();
    }

    const user = await this.userModel.create({
      email: input.email,
      password: await hash(input.password),
      firstName: input.email,
      lastName: input.lastName
    });

    await this.tokenService.send({
      email: user.email,
      type: TokenType.VERIFY_EMAIL
    });

    return user;
  }

  async verifyEmail(input: VerifyEmailInput) {
    const { email } = await this.tokenService.verify({
      ...input,
      type: TokenType.VERIFY_EMAIL
    });

    const user = await this.userModel.findOneAndUpdate(
      {
        email
      },
      {
        $set: {
          isVerified: true
        }
      },
      {
        returnDocument: 'after'
      }
    );

    if (!user) {
      throw new UserNotFound();
    }

    if (user.isDeactivated) {
      throw new UserIsDeactivated();
    }

    return user;
  }

  async signIn(input: SignInInput, ctx: GQLContext) {
    const user = await this.userModel.findOne({
      email: input.email
    });

    if (!user) {
      throw new UserNotFound();
    }

    if (!user.isVerified) {
      throw new UserNotVerified();
    }

    if (user.isDeactivated) {
      throw new UserIsDeactivated();
    }

    const validPassword = verify(user.password, input.password);

    if (!validPassword) {
      throw new WrongCredentials();
    }

    ctx.res.cookie(
      SessionConfig.platformCookieName,
      this.jwt.sign({
        id: user.id,
        email: user.email
      }),
      {
        httpOnly: true,
        sameSite: true,
        secure: !EnvConfig.isDev,
        maxAge: SessionConfig.maxAge
      }
    );

    return user;
  }

  async signOut(user: User, ctx: GQLContext) {
    ctx.res.clearCookie(SessionConfig.platformCookieName);
    return user;
  }

  async resetPassword(input: ResetPasswordInput) {
    const { email } = await this.tokenService.verify({
      ...input,
      type: TokenType.FORGOT_PASSWORD
    });

    const user = await this.userModel.findOneAndUpdate(
      {
        email
      },
      {
        $set: {
          isVerified: true
        }
      },
      {
        returnDocument: 'after'
      }
    );

    if (!user) {
      throw new UserNotFound();
    }

    if (user.isDeactivated) {
      throw new UserIsDeactivated();
    }

    return user;
  }
}
