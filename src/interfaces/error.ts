export interface APIErrorOptions {
  readonly internalCode: string;
  readonly module: string;
  readonly message: string;
  readonly additional?: any;
}
