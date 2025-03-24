const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// קבלת כל המוצרים
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בטעינת המוצרים' });
  }
});

// הוספת מוצר חדש
router.post('/', async (req, res) => {
  try {
    console.log("נתונים שהתקבלו מה-Frontend:", req.body);
    const { name, quantity, price, category, subCategory } = req.body;
    const newProduct = new Product({
      name,
      quantity,
      price,
      category,
      subCategory,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'שגיאה בהוספת מוצר' });
  }
});

// עדכון מוצר קיים
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, category, subCategory } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity, price, category, subCategory },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ error: 'מוצר לא נמצא' });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'שגיאה בעדכון המוצר' });
  }
});

// מחיקת מוצר
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ error: 'מוצר לא נמצא' });
    res.json({ message: 'המוצר נמחק בהצלחה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'שגיאה במחיקת המוצר' });
  }
});

module.exports = router;
