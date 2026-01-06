import { HttpStatus } from '@nestjs/common';
import { NestError } from './nest-error.interface';

export class ValidationError extends NestError {
  readonly httpStatus = HttpStatus.BAD_REQUEST;
  readonly code = 'VALIDATION_ERROR';
}
