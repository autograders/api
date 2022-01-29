import * as aws from '@aws-sdk/client-ses';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const MailerConfig = {
  transport: {
    SES: {
      ses: new aws.SES({ apiVersion: '2010-12-01' }),
      aws
    }
  },
  defaults: {
    from: process.env.NOREPLY_MAIL || '"Autograders" noreply@autograders.org'
  },
  template: {
    dir: join(process.cwd(), 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true
    }
  }
};
