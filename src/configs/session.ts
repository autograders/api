import { JWTConfig } from './jwt';

export const SessionConfig = {
  platformCookieName: 'autograders-platform.session-token',
  maxAge: JWTConfig.signOptions.expiresIn * 1000
};
