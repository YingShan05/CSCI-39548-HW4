const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET /api/menu
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/menu (optional admin create endpoint)
router.post('/', async (req, res) => {
  try {
    const m = new MenuItem(req.body);
    await m.save();
    res.status(201).json(m);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;