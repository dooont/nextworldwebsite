import { AppError } from "./AppError.js";

export default class DatabaseError extends AppError{
  constructor(message, statusCode = 500){
    super(message, statusCode);

    Error.captureStackTrace(this, this.constructor);
  }
}