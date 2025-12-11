const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    price: Number,
    qty: Number
  }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);