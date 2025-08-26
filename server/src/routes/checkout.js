const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
// POST /api/checkout/quote - compute totals only, no persistence
router.post('/quote',
	body('items').isArray({ min: 1 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		try {
			const { items } = req.body;
			if (mongoose.connection.readyState !== 1) {
				// If DB offline, we cannot verify prices; return minimal echo
				const subtotal = 0; const tax = 0; const deliveryFee = 5; const total = 5;
				return res.json({ items, subtotal, tax, deliveryFee, total, note: 'DB offline: quote not accurate' });
			}
			const menu = await MenuItem.find({ id: { $in: items.map(i => i.id) } }).lean();
			const menuMap = new Map(menu.map(m => [m.id, m]));
			const totals = calcTotals(items, menuMap);
			return res.json(totals);
		} catch (e) {
			if (e.message === 'invalid_item') return res.status(400).json({ error: 'invalid_item' });
			console.error(e);
			res.status(500).json({ error: 'failed' });
		}
	}
);

function calcTotals(items, menuMap) {
	let subtotal = 0;
	const normalized = items.map((it) => {
		const menu = menuMap.get(it.id);
		if (!menu) throw new Error('invalid_item');
		const quantity = Math.max(1, Number(it.quantity || 1));
		const price = Number(menu.price);
		const name = menu.name;
		const extras = Array.isArray(it.extras) ? it.extras : [];
		subtotal += price * quantity;
		return { id: menu.id, name, price, quantity, extras };
	});
	const taxRate = 0.1; // 10% demo tax
	const tax = Math.round(subtotal * taxRate * 100) / 100;
	const deliveryFee = subtotal > 50 ? 0 : 5;
	const total = Math.round((subtotal + tax + deliveryFee) * 100) / 100;
	return { items: normalized, subtotal, tax, deliveryFee, total };
}

// POST /api/checkout - create order (auth required)
router.post('/', authenticate,
	body('items').isArray({ min: 1 }),
	body('shipping').isObject(),
	body('payment').isObject(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		if (mongoose.connection.readyState !== 1) {
			// If DB offline, return a simulated order without persistence.
			const fake = {
				id: Date.now().toString(36),
				status: 'Pending',
			};
			return res.status(201).json({ order: fake, note: 'DB offline: order not persisted' });
		}

		try {
			const { items, shipping, payment } = req.body;

			const menu = await MenuItem.find({ id: { $in: items.map(i => i.id) } }).lean();
			const menuMap = new Map(menu.map(m => [m.id, m]));
			const totals = calcTotals(items, menuMap);

			// Never store card details in our DB
			const safePayment = {
				method: payment.method === 'card' ? 'card' : 'cod',
				status: 'pending',
				reference: payment.reference || undefined,
			};

			const order = await Order.create({
				userId: req.user.sub,
				items: totals.items,
				subtotal: totals.subtotal,
				tax: totals.tax,
				deliveryFee: totals.deliveryFee,
				total: totals.total,
				shipping: {
					name: (shipping.name || '').toString().slice(0, 100),
					address1: (shipping.address1 || '').toString().slice(0, 120),
					address2: (shipping.address2 || '').toString().slice(0, 120),
					city: (shipping.city || '').toString().slice(0, 60),
					state: (shipping.state || '').toString().slice(0, 30),
					postalCode: (shipping.postalCode || '').toString().slice(0, 20),
					notes: (shipping.notes || '').toString().slice(0, 200),
				},
				payment: safePayment,
				status: 'Pending',
			});

			// Also store a lightweight order reference on the user for quick profile lookup
			const light = { id: order._id.toString(), date: order.createdAt, total: order.total, items: order.items, status: order.status };
			await User.updateOne({ _id: req.user.sub }, { $push: { orders: light } });

			res.status(201).json({ order: { id: order._id, status: order.status, total: order.total } });
		} catch (e) {
			if (e.message === 'invalid_item') return res.status(400).json({ error: 'invalid_item' });
			console.error(e);
			res.status(500).json({ error: 'failed' });
		}
	}
);

// GET /api/checkout/:id - get order summary (auth required)
router.get('/:id', authenticate, async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'bad_id' });
		const order = await Order.findById(req.params.id).lean();
		if (!order || order.userId.toString() !== req.user.sub) return res.status(404).json({ error: 'not_found' });
		res.json({ order });
	} catch (e) {
		res.status(500).json({ error: 'failed' });
	}
});

module.exports = router;
