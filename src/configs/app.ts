import { PlatformConfig } from './platform';

export const AppConfig = {
  port: parseInt(process.env.PORT_NUMBER || '8080'),
  domain: process.env.APP_DOMAIN || 'localhost',
  cors: {
    methods: ['POST'],
    credentials: true,
    origin: [PlatformConfig.url]
  }
};
