const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  personalNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, required: true },
  rank: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } 
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
