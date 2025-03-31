const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// קבלת כל הקטגוריות
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "שגיאה בטעינת הקטגוריות" });
  }
});

// הוספת קטגוריה חדשה
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "יש להזין שם קטגוריה" });

  try {
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "שגיאה בהוספת הקטגוריה" });
  }
});

// מחיקת קטגוריה לפי ID
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "קטגוריה נמחקה בהצלחה" });
  } catch (error) {
    res.status(500).json({ message: "שגיאה במחיקת הקטגוריה" });
  }
});

module.exports = router;
