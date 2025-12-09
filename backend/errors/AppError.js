export class AppError extends Error {
  constructor(message, statusCode = 500, cause = null) {
    super(message, { cause });
    this.statusCode = statusCode;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
