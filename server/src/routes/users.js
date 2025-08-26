const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/users/me
router.get('/me', authenticate, async (req, res) => {
	try {
		const user = await User.findById(req.user.sub).lean();
		if (!user) return res.status(404).json({ error: 'not_found' });
		const { email, name, address } = user;
		res.json({ email, name: name || '', address: address || '' });
	} catch (e) {
		res.status(500).json({ error: 'failed' });
	}
});

// PATCH /api/users/me
router.patch('/me', authenticate,
	body('name').optional().isString().isLength({ max: 100 }),
	body('address').optional().isString().isLength({ max: 300 }),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
			const update = {};
			if (typeof req.body.name === 'string') update.name = req.body.name.trim();
			if (typeof req.body.address === 'string') update.address = req.body.address.trim();
			const user = await User.findByIdAndUpdate(req.user.sub, { $set: update }, { new: true, lean: true });
			if (!user) return res.status(404).json({ error: 'not_found' });
			const { email, name, address } = user;
			res.json({ email, name: name || '', address: address || '' });
		} catch (e) {
			res.status(500).json({ error: 'failed' });
		}
	}
);

module.exports = router;
