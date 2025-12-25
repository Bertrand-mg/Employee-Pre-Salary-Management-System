import { Express } from 'express';
import rateLimit from 'express-rate-limit';

export const applyLimit = (app: Express) => {
  const apilimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api', apilimiter);
};
