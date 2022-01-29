import { ValidationError, ValidationPipe as Pipe } from '@nestjs/common';

import { APIError } from '@utils/errors';

export class ValidationPipe extends Pipe {
  constructor() {
    super({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        return new APIError({
          internalCode: 'validation',
          module: 'global',
          message: 'Invalid input.',
          additional: { validationErrors }
        });
      }
    });
  }
}
