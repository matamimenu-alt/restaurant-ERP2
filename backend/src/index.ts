import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import routes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

const FRONTEND_DIST = path.join(__dirname, '../../../frontend/dist');

// Trust proxy - required for rate limiting behind a reverse proxy (Railway)
app.set('trust proxy', 1);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', rateLimit({ windowMs: 15 * 60 * 1000, max: 500, message: 'Too many requests' }));
app.use('/api/v1', routes);

app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Serve React frontend
app.use(express.static(FRONTEND_DIST));
app.get('*', (_req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Mat'ami ERP Server running on port ${PORT}`);
});

export default app;

