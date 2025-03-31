const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: Number,
  product: String,
  quantity: Number,
  fullName: String,
  personalNumber: String,
  phoneNumber: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
