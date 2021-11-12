import { JWTConfig } from './jwt';

export const SessionConfig = {
  platformCookieName: 'ag-platform.session-token',
  garageCookieName: 'ag-garage.session-token',
  maxAge: JWTConfig.signOptions.expiresIn * 1000
};
