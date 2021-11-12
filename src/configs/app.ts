const url = process.env.APP_ORIGIN || 'http://localhost:3000';

export const AppConfig = {
  port: parseInt(process.env.PORT_NUMBER || '8080'),
  cors: {
    methods: ['POST'],
    credentials: true,
    origin: [url]
  }
};
