import { JWTConfig } from './jwt';

export const SessionConfig = {
  cookie: 'autograders.session-token',
  maxAge: JWTConfig.signOptions.expiresIn * 1000
};
