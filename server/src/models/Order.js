const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
	id: String, // menu item id
	name: String,
	price: Number,
	quantity: Number,
	extras: { type: Array, default: [] },
}, { _id: false });

const ShippingSchema = new mongoose.Schema({
	name: { type: String },
	address1: { type: String },
	address2: { type: String },
	city: { type: String },
	state: { type: String },
	postalCode: { type: String },
	// Do NOT store phone/email if you want strict minimal PII; rely on user record
	notes: { type: String },
}, { _id: false });

const PaymentSchema = new mongoose.Schema({
	method: { type: String, enum: ['cod', 'card'], default: 'cod' },
	status: { type: String, enum: ['pending', 'authorized', 'paid', 'failed'], default: 'pending' },
	// Never store raw card numbers; if integrating PSP, store only PSP paymentIntentId
	reference: { type: String },
}, { _id: false });

const OrderSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	items: { type: [OrderItemSchema], required: true },
	subtotal: { type: Number, required: true },
	tax: { type: Number, required: true },
	deliveryFee: { type: Number, default: 0 },
	total: { type: Number, required: true },
	shipping: { type: ShippingSchema },
	payment: { type: PaymentSchema },
	status: { type: String, enum: ['Pending', 'Confirmed', 'Preparing', 'OutForDelivery', 'Completed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

// Useful index to fetch a user's orders, newest first
OrderSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Order', OrderSchema);
