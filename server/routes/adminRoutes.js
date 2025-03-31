const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// ראוט התחברות - בדיקת שם משתמש וסיסמה ב-DB
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("👉 קיבלתי בקשה עם: username =", username, ", password =", password);

  try {
    // חיפוש לפי שם משתמש בלי רגישות לאותיות ורווחים
    const admin = await Admin.findOne({ 
      username: new RegExp(`^${username.trim()}$`, 'i'),
      password: password.trim() 
    });

    console.log("🔎 תוצאה מהחיפוש:", admin);

    if (!admin) {
      return res.status(401).json({ message: 'שם משתמש או סיסמה שגויים' });
    }

    res.json({ message: 'התחברות הצליחה', admin });

  } catch (error) {
    console.error("שגיאה:", error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const admins = await Admin.find();
    console.log("📂 כל המשתמשים שנמצאו:", admins);
    res.json(admins);
  } catch (error) {
    console.error("שגיאה בזמן שליפת כל המשתמשים:", error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
});

module.exports = router;
