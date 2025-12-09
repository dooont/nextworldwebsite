import { AppError } from "./AppError.js";

export default class EmailError extends AppError {
  constructor(message, statusCode = 500, cause = null) {
    super(message, statusCode, cause);

    Error.captureStackTrace(this, this.constructor);
  }
}
