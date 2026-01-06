import type { HttpStatus } from '@nestjs/common';

export type Details = Record<string, unknown>;

export abstract class NestError<D extends Details = Details> extends Error {
  abstract readonly httpStatus?: HttpStatus;
  /**
   * Code to associate error with
   * @example
   * new NestError(code="invalid_payment_token")
   */
  abstract readonly code?: string;

  constructor(
    /**
     * User-readable message
     * @example
     * new NestError(message="Something went wrong handling your payment.")
     */
    message: string,
    /**
     * Any useful info to return to the client
     */
    readonly details?: D,
  ) {
    super(message);
  }

  get name(): string {
    return this.constructor.name;
  }
}
