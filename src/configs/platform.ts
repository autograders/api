const url = process.env.APP_ORIGIN || 'http://localhost:3000';

export const PlatformConfig = {
  url,
  routes: {
    verifyEmail: `${url}/verify-email`,
    resetPassword: `${url}/reset-password`
  }
};
