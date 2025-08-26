const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String },
  extras: { type: Array, default: [] },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
