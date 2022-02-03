import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Sign in input.'
})
export class SignInInput {
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
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
