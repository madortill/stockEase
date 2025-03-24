const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
});

module.exports = mongoose.model("InventoryProduct", productSchema);
