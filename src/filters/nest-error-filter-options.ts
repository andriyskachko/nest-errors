/**
 * Configuration options for the `NestErrorFilter`.
 */

export interface NestErrorFilterOptions {
  /**
   * **Default**: `false`
   *
   * When `false`, `NotFoundException` thrown by NestJS services/controllers will **bypass** the filter entirely.
   *
   * - The original `NotFoundException` is re-thrown as-is
   * - Standard NestJS 404 response is sent (no custom NestError formatting)
   * - Filter's `catch()` method is **not called**
   *
   * When `false` (default):
   * - `NotFoundException` is caught and converted to your custom `NestError` format
   * - Custom error response structure is applied
   */
  convertNestNotFoundExceptionToNestError: boolean;
}
