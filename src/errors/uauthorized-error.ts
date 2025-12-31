import { HttpStatus } from '@nestjs/common';
import { Details, NestError } from './nest-error.interface';

export class UnauthorizedError<
  D extends Details = Details,
> extends NestError<D> {
  readonly httpStatus = HttpStatus.UNAUTHORIZED;

  constructor(message: string, details?: D) {
    super('UNAUTHORIZED', message, details);
  }
}
