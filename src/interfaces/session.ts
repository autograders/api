export interface Session {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar: string;
  readonly authKey: string;
  readonly isInstructor: boolean;
}
