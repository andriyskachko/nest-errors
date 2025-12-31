import { HttpStatus } from '@nestjs/common';
import { Details, NestError } from './nest-error.interface';

export class NotFoundError<D extends Details = Details> extends NestError<D> {
  readonly httpStatus = HttpStatus.NOT_FOUND;

  constructor(entity: string, details?: D) {
    super(`${entity.toUpperCase()}_NOT_FOUND`, `${entity} not found`, details);
  }
}
