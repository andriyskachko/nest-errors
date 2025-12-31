import type { HttpStatus } from '@nestjs/common';

export type Details = Record<string, unknown>;

export abstract class NestError<D extends Details = Details> extends Error {
  readonly httpStatus?: HttpStatus;

  constructor(
    readonly code: string,
    readonly message: string,
    readonly details?: D,
  ) {
    super(message);
  }

  get name(): string {
    return this.constructor.name;
  }
}
