const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

router.post('/add', async (req, res) => {
  try {
    const newGuest = new Guest({
      ...req.body,
      createdAt: new Date()
    });

    await newGuest.save();
    console.log("✅ אורח חדש נוסף:", newGuest);
    res.status(201).json({ message: 'האורח נוסף בהצלחה!', guest: newGuest });
  } catch (error) {
    console.error("❌ שגיאה בעת הוספת אורח:", error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
});

module.exports = router;
