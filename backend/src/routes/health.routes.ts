import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Endpoint: GET /health or /api/health
router.get('/health', (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    success: true,
    message: 'Backend is running',
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)}s`,
  });
});

export default router;
