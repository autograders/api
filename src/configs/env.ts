export const EnvConfig = {
  name: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isStaging: process.env.NODE_ENV === 'staging'
};
