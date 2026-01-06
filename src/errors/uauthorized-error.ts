import { HttpStatus } from '@nestjs/common';
import { NestError } from './nest-error.interface';

export class UnauthorizedError extends NestError {
  readonly httpStatus = HttpStatus.UNAUTHORIZED;
  readonly code = 'UNAUTHORIZED';
}
