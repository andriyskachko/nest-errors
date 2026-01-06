import { HttpStatus } from '@nestjs/common';
import { Details, NestError } from './nest-error.interface';

export class NotFoundError<D extends Details = Details> extends NestError<D> {
  readonly httpStatus = HttpStatus.NOT_FOUND;
  readonly code = 'ENTITY_NOT_FOUND';

  constructor(readonly entity: string, details: D) {
    super(`${entity} not found`, details);
  }
}
