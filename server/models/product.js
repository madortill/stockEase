const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
}, { collection: 'inventoryproducts' }); // מגדירים במפורש את שם הקולקשן

module.exports = mongoose.model("InventoryProduct", productSchema);
