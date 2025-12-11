const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const c = new Contact(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;