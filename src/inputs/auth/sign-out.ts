import { IsBoolean } from 'class-validator';

export class SignOutInput {
  @IsBoolean()
  readonly allDevices: boolean;
}
