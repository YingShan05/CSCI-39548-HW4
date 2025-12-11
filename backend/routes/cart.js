const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart by sessionId: /api/cart?sessionId=abc
router.get('/', async (req, res) => {
  const sessionId = req.query.sessionId;
  if (!sessionId) return res.status(400).json({ error: 'sessionId required' });
  let cart = await Cart.findOne({ sessionId }).populate('items.item');
  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
    await cart.save();
  }
  res.json(cart);
});

// Update cart (replace items)
router.post('/', async (req, res) => {
  const { sessionId, items } = req.body;
  if (!sessionId) return res.status(400).json({ error: 'sessionId required' });
  let cart = await Cart.findOneAndUpdate(
    { sessionId },
    { items, updatedAt: new Date() },
    { new: true, upsert: true }
  );
  res.json(cart);
});

// Remove cart (delete)
router.delete('/', async (req, res) => {
  const { sessionId } = req.body;
  await Cart.findOneAndDelete({ sessionId });
  res.json({ ok: true });
});

router.delete('/clear', async (req, res) => {
    const { sessionId } = req.body;
    await Cart.findOneAndUpdate(
      { sessionId },
      { items: [] }
    );
    res.json({ ok: true });
  });
  
module.exports = router;

