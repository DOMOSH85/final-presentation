const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  price: { type: Number, required: true }, // price per kg
  unit: { type: String, default: 'kg' },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('MarketPrice', marketPriceSchema);