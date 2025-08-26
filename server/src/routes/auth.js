const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const email = String(req.body.email || '').toLowerCase().trim();
    const { password, name } = req.body;
    if (mongoose.connection.readyState !== 1) {
      // DB offline: return demo token
      const token = jwt.sign({ sub: 'demo', email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, profile: { email, name: name || 'Demo User', address: '' } });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name: name || '', passwordHash });
    const token = jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, profile: { email: user.email, name: user.name, address: user.address || '' } });
  }
);

router.post('/login', async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim();
  const { password } = req.body;
  if (mongoose.connection.readyState !== 1) {
    // DB offline: accept any credentials for demo
    const token = jwt.sign({ sub: 'demo', email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, profile: { email, name: 'Demo User', address: '' } });
  }
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'invalid' });
  const ok = await bcrypt.compare(password, user.passwordHash || '');
  if (!ok) return res.status(401).json({ error: 'invalid' });
  const token = jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, profile: { email: user.email, name: user.name || '', address: user.address || '' } });
});

module.exports = router;
