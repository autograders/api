import * as aws from '@aws-sdk/client-ses';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const MailerConfig = {
  transport: {
    SES: {
      ses: new aws.SES({ apiVersion: '2010-12-01' }),
      aws
    }
  },
  defaults: {
    from: process.env.NOREPLY_MAIL || 'noreply@autograders.org'
  },
  template: {
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true
    }
  }
};
