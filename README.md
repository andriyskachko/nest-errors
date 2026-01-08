# Nest Errors Filter

A _Laravel-inspired_ global exception filter for NestJS that provides structured, detailed error responses with more context than standard NestJS exceptions

## Quick Start

1. Installation
   `npm i nest-errors`
2. Setup (`main.ts`)
   ```typescript
   app.useGlobalFilters(
     new NestErrorsFilter({
       convertNestNotFoundExceptionToNestError: false, // Keep native 404s (optional)
     }),
   );
   ```
3. Throw custom errors

   ```typescript
   // errors/payment.error.ts
   import { NestError } from 'nestjs-errors-filter';
   import { HttpStatus } from '@nestjs/common';

   export class InvalidPaymentTokenError extends NestError {
     readonly httpStatus = HttpStatus.BAD_REQUEST;
     readonly code = 'INVALID_PAYMENT_TOKEN';

     constructor(token: string) {
       super('Invalid payment token provided.', {
         token: token.substring(0, 8) + '...', // partial for security
         expectedFormat: 'stripe_v1_...',
       });
     }
   }

   // In your service
   throw new InvalidPaymentTokenError(req.body.token);
   ```

4. Error Response Format
   ```json
   {
     "success": false,
     "error": {
       "name": "InvalidPaymentTokenError",
       "code": "INVALID_PAYMENT_TOKEN",
       "message": "Invalid payment token provided.",
       "details": {
         "token": "tok_1abc...",
         "expectedFormat": "stripe_v1_..."
       },
       "path": "/api/payments/process"
     }
   }
   ```
