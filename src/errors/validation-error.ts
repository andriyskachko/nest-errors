import { HttpStatus } from '@nestjs/common';
import { Details, NestError } from './nest-error.interface';

export class ValidationError<D extends Details = Details> extends NestError<D> {
  readonly httpStatus = HttpStatus.BAD_REQUEST;

  constructor(message: string, details?: D) {
    super('VALIDATION_ERROR', message, details);
  }
}
