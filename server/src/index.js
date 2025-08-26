require('dotenv').config();
// Force reliable DNS resolvers to avoid local DNS timeouts
try {
  const dns = require('dns');
  dns.setServers(['1.1.1.1', '8.8.8.8']);
} catch {}
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const path = require('path');

const menuRouter = require('./routes/menu');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const checkoutRouter = require('./routes/checkout');

const app = express();

// Security middlewares
app.use(helmet());
app.use(express.json());
// CORS: allow specific origin if provided, otherwise allow same-origin (true)
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN : true,
};
app.use(cors(corsOptions));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// Routes
// Static files for product images
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use('/api/menu', menuRouter);
app.use('/api/profile', profileRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/checkout', checkoutRouter);

// If a built frontend exists, serve it as static (useful for single-service deploys)
try {
  const fs = require('fs');
  const frontendDist = path.join(__dirname, '../frontend/dist');
  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    // Serve index.html for any non-API route (client-side routing)
    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(path.join(frontendDist, 'index.html'));
    });
    console.log('Serving frontend from', frontendDist);
  }
} catch (e) {
  // ignore; not critical
}

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.get('/healthz', (req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;

// Try to connect to MongoDB but don't block server start
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error (server will still start with fallback data):', err.message || err);
  })
  .finally(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
