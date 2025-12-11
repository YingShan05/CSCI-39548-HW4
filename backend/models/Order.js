const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    price: Number,
    qty: Number
  }],
  total: Number,
  customer: {
    name: String,
    email: String,
    note: String
  },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'received' }
});

module.exports = mongoose.model('Order', orderSchema);