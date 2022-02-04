import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '@models/user';
import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { UserGuard } from '@shared/guards/user.guard';
import { GQLContext } from '@shared/interfaces/gql-context';

import { AuthService } from './auth.service';
import { ResetPasswordInput } from './dto/reset-password.input';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { VerifyEmailInput } from './dto/verify-email.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, {
    nullable: false,
    description: 'Sign up.'
  })
  signUp(@Args('input') input: SignUpInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => User, {
    nullable: false,
    description: 'Verify user email.'
  })
  verifyEmail(@Args('input') input: VerifyEmailInput) {
    return this.authService.verifyEmail(input);
  }

  @Mutation(() => User, {
    nullable: false,
    description: 'Sign in.'
  })
  signIn(@Args('input') input: SignInInput, @Context() ctx: GQLContext) {
    return this.authService.signIn(input, ctx);
  }

  @Mutation(() => User, {
    nullable: false,
    description: 'Sign out.'
  })
  @UseGuards(UserGuard)
  signOut(@AuthUser() user: User, @Context() ctx: GQLContext) {
    return this.authService.signOut(user, ctx);
  }

  @Mutation(() => User, {
    nullable: false,
    description: 'Reset password.'
  })
  resetPassword(@Args('input') input: ResetPasswordInput) {
    return this.authService.resetPassword(input);
  }
}
