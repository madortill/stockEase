const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

// הוספת אורח חדש
router.post('/add', async (req, res) => {
  try {
    const { firstName, lastName, personalNumber } = req.body;

    // בדיקה אם האורח כבר קיים
    const existingGuest = await Guest.findOne({ firstName, lastName, personalNumber });
    if (existingGuest) {
      return res.status(400).json({ message: 'האורח כבר קיים במערכת' });
    }

    const newGuest = new Guest({
      ...req.body,
      createdAt: new Date()
    });

    await newGuest.save();
    res.status(201).json({ message: 'האורח נוסף בהצלחה!', guest: newGuest });
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
});

// כניסת אורח קיים
router.post('/login', async (req, res) => {
  const { fullName, personalNumber } = req.body;
  try {
    const [firstName, lastName] = fullName.split(' ');
    const guest = await Guest.findOne({ firstName, lastName, personalNumber });
    if (guest) {
      return res.json({ success: true, user: guest });
    } else {
      return res.json({ success: false, message: 'אורח לא נמצא' });
    }
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
});

module.exports = router;
