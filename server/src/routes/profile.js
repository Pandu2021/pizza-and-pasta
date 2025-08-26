const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

// GET /api/profile - get own profile + orders (auth required)
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).lean();
    if (!user) return res.status(404).json({ error: 'not_found' });
    const profile = { name: user.name || '', email: user.email, address: user.address || '' };
    res.json({ profile, orders: user.orders || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

// POST /api/profile/orders - append an order (requires auth)
router.post('/orders', authenticate, async (req, res) => {
  try {
    const userId = req.user.sub;
    const { items = [], total = 0 } = req.body;
    const order = { id: Date.now().toString(36), date: new Date().toISOString(), total, items, status: 'Pending' };
    await User.updateOne({ _id: userId }, { $push: { orders: order } });
    res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

module.exports = router;
