import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsStrongPassword } from '@shared/validators/is-strong-password';

@InputType({
  description: 'Sign up input.'
})
export class SignUpInput {
  @Field(() => String, {
    nullable: false,
    description: 'User first name.'
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @Field(() => String, {
    nullable: false,
    description: 'User last name.'
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @Field(() => String, {
    nullable: false,
    description: 'User email.'
  })
  @IsEmail()
  readonly email: string;

  @Field(() => String, {
    nullable: false,
    description: 'User password.'
  })
  @IsStrongPassword()
  readonly password: string;
}
