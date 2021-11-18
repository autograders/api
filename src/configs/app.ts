const url = process.env.APP_ORIGIN || 'http://localhost:3000';

export const AppConfig = {
  port: parseInt(process.env.PORT_NUMBER || '8080'),
  domain: process.env.APP_DOMAIN || 'localhost',
  cors: {
    methods: ['POST'],
    credentials: true,
    origin: [url]
  }
};
