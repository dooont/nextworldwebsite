export default function errorHandler(err, req, res, next) {

  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;
  const isDevelopment = process.env.NODE_ENV === 'development';

  console.error('Error: ', {
    message: err.message,
    stack: err.stack,
    statusCode,
    path: req.path,
    method: req.method
  });

  const response = {
    error: {
      message: isOperational ? err.message : 'An unexpected error occured',
      statusCode
    }
  }

  if (isDevelopment) {
    response.error.stack = err.stack;
    response.error.name = err.name;
  }

  res.status(statusCode).json(response);
}