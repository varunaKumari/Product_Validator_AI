import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  logger.error('CRITICAL: MONGODB_URI environment variable is missing.');
  process.exit(1);
}

export const connectDB = async (): Promise<void> => {
  const options = {
    autoIndex: true,
    maxPoolSize: 50,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connected successfully.');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB connection lost. Reconnecting...');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected successfully.');
  });

  try {
    logger.info('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, options);
  } catch (error: any) {
    logger.error(`Initial MongoDB connection error: ${error.message}`);
    // Wait before retrying initial connection
    setTimeout(() => {
      logger.info('Retrying MongoDB connection...');
      connectDB();
    }, 5000);
  }
};

export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed through app termination.');
  } catch (error: any) {
    logger.error(`Error closing MongoDB connection: ${error.message}`);
  }
};
