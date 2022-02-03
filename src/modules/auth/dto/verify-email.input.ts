import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Verify email input.'
})
export class VerifyEmailInput {
  @Field(() => String, {
    nullable: false,
    description: 'User email.'
  })
  @IsEmail()
  readonly email: string;

  @Field(() => String, {
    nullable: false,
    description: 'Verification token.'
  })
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
