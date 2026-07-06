import dotenv from 'dotenv';
import path from 'path';

// Load environment variables before any other imports
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { connectDB, closeDB } from './config/db';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './utils/appError';
import healthRouter from './routes/health.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Security HTTP headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);

// Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Express JSON parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan('combined', {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    })
  );
}

// Mount Routes
app.use('/api', healthRouter);
app.use('/api/v1', healthRouter);

// Match all unmatched routes and trigger NotFound error
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Cannot find path ${req.originalUrl} on this server`));
});

// Global Error Handler Middleware
app.use(errorHandler);

// Start server listening
const server = app.listen(PORT, () => {
  logger.info(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err: any) => {
  logger.error(`Unhandled Promise Rejection: ${err.message || err}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: any) => {
  logger.error(`Uncaught Exception: ${err.message || err}`);
  server.close(() => process.exit(1));
});

// Graceful Shutdown
const shutdown = () => {
  logger.info('SIGTERM/SIGINT signal received: shutting down server...');
  server.close(async () => {
    logger.info('HTTP server closed.');
    await closeDB();
    logger.info('Shutdown complete. Exiting.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
