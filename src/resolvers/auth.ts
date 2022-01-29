import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserGuard } from '@guards/auth';
import { ForgotPasswordInput } from '@inputs/auth/forgot-password';
import { ResendEmailVerificationInput } from '@inputs/auth/resend-email-verification';
import { ResetPasswordInput } from '@inputs/auth/reset-password';
import { SignInInput } from '@inputs/auth/sign-in';
import { SignUpInput } from '@inputs/auth/sign-up';
import { VerifyEmailInput } from '@inputs/auth/verify-email';
import { GQLContext } from '@interfaces/gql';
import { AuthService } from '@services/auth';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation()
  async signUp(@Args('input') input: SignUpInput) {
    return await this.auth.signUp(input);
  }

  @Mutation()
  async resendEmailVerification(
    @Args('input') input: ResendEmailVerificationInput
  ) {
    return await this.auth.resendEmailVerification(input);
  }

  @Mutation()
  async verifyEmail(@Args('input') input: VerifyEmailInput) {
    return await this.auth.verifyEmail(input);
  }

  @Mutation()
  async signIn(@Context() ctx: GQLContext, @Args('input') input: SignInInput) {
    return await this.auth.signIn(input, ctx);
  }

  @Mutation()
  @UseGuards(UserGuard)
  async signOut(@Context() ctx: GQLContext) {
    return await this.auth.signOut(ctx);
  }

  @Mutation()
  async forgotPassword(@Args('input') input: ForgotPasswordInput) {
    return await this.auth.forgotPassword(input);
  }

  @Mutation()
  async resetPassword(@Args('input') input: ResetPasswordInput) {
    return await this.auth.resetPassword(input);
  }
}
