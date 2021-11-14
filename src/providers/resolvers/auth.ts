import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { SessionConfig } from '@configs/session';
import { CurrentUser } from '@decorators/auth';
import { AuthGuard } from '@guards/auth';
import {
  ResetPasswordInput,
  SignInInput,
  SignOutInput,
  SignUpInput
} from '@inputs/auth';
import { PinInput } from '@inputs/common';
import { GQLContext } from '@interfaces/gql';
import { AuthService } from '@services/auth';
import { SessionService } from '@services/session';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly session: SessionService
  ) {}

  @Mutation()
  async signUp(@Args('input') input: SignUpInput) {
    return await this.auth.signUp(input);
  }

  @Mutation()
  async verifyEmail(@Args('input') input: PinInput) {
    return await this.auth.verifyEmail(input);
  }

  @Mutation()
  async signIn(@Context() ctx: GQLContext, @Args('input') input: SignInInput) {
    const user = await this.auth.signIn(input);
    await this.session.refresh(user, ctx);

    return user;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async refreshSession(@Context() ctx: GQLContext, @CurrentUser() user: User) {
    await this.session.refresh(user, ctx);

    return user;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async signOut(
    @Context() ctx: GQLContext,
    @CurrentUser() user: User,
    @Args('input') input: SignOutInput
  ) {
    await this.auth.signOut(user, input);
    ctx.res.clearCookie(SessionConfig.cookie);
  }

  @Mutation()
  async resetPassword(@Args('input') input: ResetPasswordInput) {
    return await this.auth.resetPassword(input);
  }
}
