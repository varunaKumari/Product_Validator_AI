import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  error.stack = err.stack;

  // Log error using structured logger
  logger.error({
    msg: err.message || 'Server Error',
    status: error.statusCode,
    url: req.originalUrl,
    method: req.method,
    stack: error.stack,
  });

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new AppError(message, 400);
  }

  // Mongoose Duplicate Key (11000)
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 409);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(', ');
    error = new AppError(message, 400);
  }

  const isDev = process.env.NODE_ENV === 'development';

  res.status(error.statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    ...(isDev && { stack: error.stack }),
  });
};
