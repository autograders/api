import { APIErrorOptions } from '@shared/interfaces/api-error-options';

export class APIError extends Error {
  readonly internalCode: string;
  readonly module: string;
  readonly message: string;
  readonly extensions?: any;

  constructor(options: APIErrorOptions) {
    super(options.message);
    Object.setPrototypeOf(this, APIError.prototype);
    this.internalCode = options.internalCode;
    this.module = options.module;
    this.message = options.message;
    this.extensions = options.extensions || {};
  }
}
