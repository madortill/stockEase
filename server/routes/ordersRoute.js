const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// יצירת הזמנה חדשה
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: 'שמירת ההזמנה נכשלה', details: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בשליפת ההזמנות', details: err });
  }
});

module.exports = router;
