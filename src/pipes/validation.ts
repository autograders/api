import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe as Pipe
} from '@nestjs/common';

export class ValidationPipe extends Pipe {
  constructor() {
    super({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new HttpException(
          {
            message: 'Validation error',
            code: 'validation',
            validationErrors: errors.map((e) => ({
              value: e.value,
              property: e.property,
              constraints: e.constraints
            }))
          },
          HttpStatus.BAD_REQUEST
        );
      }
    });
  }
}
