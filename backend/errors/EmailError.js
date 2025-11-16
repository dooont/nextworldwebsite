export default class EmailError extends Error{
  constructor(message, statusCode = 500){
    super(message, statusCode);

    Error.captureStackTrace(this, this.constructor);
  }
}