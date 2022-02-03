import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsStrongPassword } from '@shared/validators/is-strong-password';

@InputType({
  description: 'Reset password input.'
})
export class ResetPasswordInput {
  @Field(() => String, {
    nullable: false,
    description: 'User email.'
  })
  @IsEmail()
  readonly email: string;

  @Field(() => String, {
    nullable: false,
    description: 'Reset password token.'
  })
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @Field(() => String, {
    nullable: false,
    description: 'User new password.'
  })
  @IsStrongPassword()
  readonly newPassword: string;
}
