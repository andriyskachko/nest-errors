import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import type { Response } from 'express';
import { NestError } from '../errors';

type Optional<T> = T | undefined | null;

export interface NestErrorFilterOptions {
  /** should NotFoundException be treated as NestError */
  passNFException: boolean;
}

@Catch()
class NestErrorsFilter implements ExceptionFilter {
  readonly options: Optional<NestErrorFilterOptions> = null;

  constructor(options: Optional<NestErrorFilterOptions>) {
    this.options = options;
  }

  catch(exception: NestError | HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      res: Response = ctx.getResponse(),
      req = ctx.getRequest(),
      isNotFoundException = exception instanceof NotFoundException;

    let status = HttpStatus.INTERNAL_SERVER_ERROR,
      code = 'INTERNAL_ERROR',
      message = 'An unexpected error occurred.',
      details: Optional<Record<string, unknown> | string> = null,
      name = exception?.name || 'Error';

    if (this.options?.passNFException && isNotFoundException) {
      throw exception;
    }

    if (exception instanceof NestError) {
      status = exception.httpStatus ?? status;
      code = exception.code ?? code;
      message = exception.message ?? message;
      details = exception.details ?? null;
      name = exception.name ?? name;
    } else if (exception instanceof HttpException) {
      const response = exception.getResponse();
      status = exception.getStatus();
      if (typeof response === 'object' && response !== null) {
        const resObj = response as Record<string, string>;
        code = resObj['code'] ?? code;
        message = resObj['message'] ?? exception.message;
        details = resObj['details'] ?? null;
      } else {
        message = response;
      }
    } else {
      message = exception?.message ?? message;
      details = exception?.stack ?? null;
    }

    res.status(status).json({
      success: false,
      error: {
        name,
        code,
        message,
        details,
        path: req.url,
      },
    });
  }
}

export function nestErrorsFilterFactory(
  options: Optional<NestErrorFilterOptions>,
): ExceptionFilter {
  return new NestErrorsFilter(options);
}
