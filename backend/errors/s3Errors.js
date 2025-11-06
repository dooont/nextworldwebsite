export class S3Error extends Error {
  constructor(message, statusCode = 500, awsError = null) {
    super(message);
    this.name = "S3Error";
    this.statusCode = statusCode;
    this.awsError = awsError;
  }
}