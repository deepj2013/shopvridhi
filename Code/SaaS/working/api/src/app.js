import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import inventoryRoutes from './routes/inventory.js';
import ecommerceRoutes from './routes/ecommerce.js';
import adminRoutes from './routes/admin.js';
import dashboardRoutes from './routes/dashboard.js';
import publicRoutes from './routes/public.js';
import { attachRequestId, errorEnvelopeHandler } from './middleware/requestContext.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(attachRequestId);
  app.use(express.json());

  app.get('/api/v1/health', (_req, res) => {
    res.json({ status: 'ok', service: 'shopvridhi-api' });
  });

  app.get('/api/v1/ready', (_req, res) => {
    res.json({ status: 'ready', service: 'shopvridhi-api' });
  });

  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/inventory', inventoryRoutes);
  app.use('/api/v1/ecommerce', ecommerceRoutes);
  app.use('/api/v1/admin', adminRoutes);
  app.use('/api/v1/dashboard', dashboardRoutes);
  app.use('/api/v1/public', publicRoutes);

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Route not found',
        details: [],
        retryable: false
      },
      meta: {
        requestId: req.requestId || ''
      }
    });
  });

  app.use(errorEnvelopeHandler);

  return app;
}
